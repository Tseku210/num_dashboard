import React, { useState, useEffect, forwardRef } from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Slide from "@mui/material/Slide";
import { Autocomplete } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import ListboxComponent from "./ListboxComponent";
import ScheduleItem from "./ScheduleItem";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import { red, green, orange } from "@mui/material/colors";
import {
  daysOfWeek,
  timeOptions,
  colorOptions,
  typeOfSubject,
} from "../../../utils/constants";
import {
  fetchSubjects,
  fetchProfessors,
  fetchGeneratedSchedule,
  fetchDifficulty,
} from "../../../utils/fetch";
import { uniqueId } from "lodash";
import { useTheme } from "@mui/material";
import { tokens } from "../../../theme";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DifficultyItem = ({ difficulty }) => {
  const getColor = () => {
    if (difficulty === "Easy") return green[500];
    if (difficulty === "Medium") return orange[500];
    if (difficulty === "High") return red[500];
  };
  const getName = () => {
    if (difficulty === "Easy") return "Амархан";
    if (difficulty === "Medium") return "Дунд";
    if (difficulty === "High") return "Хүнд";
  };

  return (
    <Box
      mr="5px"
      pt="2px"
      pb="2px"
      pr="5px"
      pl="5px"
      sx={{
        border: `2px solid ${getColor()}`,
        borderRadius: "5px",
        color: getColor(),
      }}>
      {getName()}
    </Box>
  );
};

const defaultVariation = {
  type: "",
  dayOfWeek: "",
  professor: "",
  startTime: "",
  endTime: "",
};

const NewFormDialog = ({ open, onClose, handleSchedule }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [formState, setFormState] = useState({
    subjects: [],
  });
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [addProfessorOpen, setaddProfessorOpen] = useState(false);
  const [inputProfessorName, setInputProfessorName] = useState("");
  const [inputProfessorNameError, setInputProfessorNameError] = useState(false);

  useEffect(() => {
    const fetchSubjectValues = async () => {
      const subjects = await fetchSubjects();
      setSubjects(subjects);
    };
    fetchSubjectValues();
    setFormState({
      subjects: [],
    });
  }, []);

  const fetchProfessorValues = async (subjectId, subjectUniqueId) => {
    const professors = await fetchProfessors(subjectId);
    setFormState((prevState) => {
      const subjects = prevState.subjects.map((subject) => {
        if (subject.id === subjectUniqueId) {
          return { ...subject, professors };
        }
        return subject;
      });
      return { ...prevState, subjects };
    });
  };

  const addSubject = async (subject) => {
    if (!subject) return;
    const diff = await fetchDifficulty(subject.name);
    const uniqId = uniqueId();
    setFormState((prevState) => {
      return {
        ...prevState,
        subjects: [
          ...prevState.subjects,
          {
            id: uniqId,
            name: subject.name,
            color: colorOptions[0].value,
            difficulty: diff.Difficulty_Level,
            variations: [{}],
            professors: [],
          },
        ],
      };
    });
    setSelectedSubject(null);
    fetchProfessorValues(subject.id, uniqId);
  };

  const addVariation = (subjectId) => {
    setFormState((prevState) => {
      const subjects = prevState.subjects.map((subject) => {
        if (subject.id === subjectId) {
          return {
            ...subject,
            variations: [...subject.variations, {}],
          };
        }
        return subject;
      });
      return { ...prevState, subjects };
    });
  };

  const updateVariation = (subjectId, variationIndex, updatedVariation) => {
    setFormState((prevState) => {
      const subjects = prevState.subjects.map((subject) => {
        if (subject.id === subjectId) {
          return {
            ...subject,
            variations: subject.variations.map((variation, index) =>
              index === variationIndex ? updatedVariation : variation
            ),
          };
        }
        return subject;
      });
      return { ...prevState, subjects };
    });
  };

  const removeVariation = (subjectId, variationIndex) => {
    setFormState((prevState) => {
      const subjects = prevState.subjects.map((subject) => {
        if (subject.id === subjectId) {
          return {
            ...subject,
            variations: subject.variations.filter(
              (_, index) => index !== variationIndex
            ),
          };
        }
        return subject;
      });
      return { ...prevState, subjects };
    });
  };

  const removeSubject = (subjectId) => {
    setFormState((prevState) => {
      return {
        ...prevState,
        subjects: prevState.subjects.filter(
          (subject) => subject.id !== subjectId
        ),
      };
    });
  };

  const handleOpenProfessorDialog = () => {
    setaddProfessorOpen(true);
  };

  const handleCloseProfessorDialog = () => {
    setaddProfessorOpen(false);
  };

  const handleAddProfessor = (subjectId) => {
    if (inputProfessorName.trim() === "") {
      setInputProfessorNameError(true);
      return;
    }

    setFormState((prevState) => {
      const subjects = prevState.subjects.map((subject) => {
        if (subject.id === subjectId) {
          return {
            ...subject,
            professors: [...subject.professors, inputProfessorName],
          };
        }
        return subject;
      });
      return { ...prevState, subjects };
    });

    setInputProfessorNameError(false);
    setInputProfessorName("");
    handleCloseProfessorDialog();
  };

  const handleColorPick = (subjectId, color) => {
    if (color === "") return;

    setFormState((prevState) => {
      const subjects = prevState.subjects.map((subject) => {
        if (subject.id === subjectId) {
          return {
            ...subject,
            color: color,
          };
        }
        return subject;
      });
      return { ...prevState, subjects };
    });
  };

  function handleEndTime(time, minutes) {
    const [hour, minute] = time.split(":");
    const date = new Date();
    date.setHours(hour, minute, 0, 0);
    date.setMinutes(date.getMinutes() + minutes);
    const newHour = date.getHours().toString().padStart(2, "0");
    const newMinute = date.getMinutes().toString().padStart(2, "0");
    return `${newHour}:${newMinute}`;
  }
  const handleSubmit = async () => {
    const schedules = await fetchGeneratedSchedule(formState);
    handleSchedule(schedules);
    onClose();
  };

  const handleClose = () => {
    // setFormState({
    //   subjects: [],
    // });
    // setSelectedSubject(null);
    // setaddProfessorOpen(false);
    // setInputProfessorName("");
    // setInputProfessorNameError(false);
    onClose();
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}>
      <AppBar
        sx={{
          position: "relative",
          backgroundColor:
            theme.palette.mode === "dark"
              ? colors.greenAccent[600]
              : colors.greenAccent[400],
        }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Хуваарь нэмэх
          </Typography>
          <Button autoFocus color="inherit" onClick={handleSubmit}>
            хадгалах
          </Button>
        </Toolbar>
      </AppBar>
      <Box display="flex">
        <Box p="25px" display="flex" flexDirection="column" gap="25px">
          {/* new version */}
          <Box display="flex" gap="10px">
            <Autocomplete
              sx={{ width: "300px" }}
              options={subjects}
              getOptionLabel={(option) => option.name}
              id="subject"
              clearOnEscape
              value={selectedSubject || null}
              onChange={(_, value) => setSelectedSubject(value)}
              isOptionEqualToValue={(option, value) =>
                option.id === value.id && option.name === value.name
              }
              renderInput={(params) => (
                <TextField {...params} label="Хичээл" variant="standard" />
              )}
              ListboxComponent={ListboxComponent}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={() => addSubject(selectedSubject)}>
              + Хичээл нэмэх
            </Button>
          </Box>
          {formState.subjects.map((subject) => (
            <Box
              key={subject.id}
              display="flex"
              flexDirection="column"
              gap="5px">
              <Box display="flex" alignItems="center">
                <DifficultyItem difficulty={subject.difficulty} />
                <Typography variant="h6">{subject.name}</Typography>
                <IconButton
                  type="button"
                  sx={{ p: 1 }}
                  onClick={(e) => removeSubject(subject.id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
              <FormControl
                sx={{ width: "120px", margin: "10px 0" }}
                variant="outlined">
                <InputLabel>Өнгө сонгох</InputLabel>
                <Select
                  label="Өнгө сонгох"
                  value={subject.color}
                  onChange={(e) => handleColorPick(subject.id, e.target.value)}>
                  {colorOptions.map((colorOption, index) => (
                    <MenuItem key={index} value={colorOption.value}>
                      <Box display="flex" alignItems="center">
                        <Box
                          width={16}
                          height={16}
                          marginRight={1}
                          bgcolor={colorOption.value}></Box>
                        {colorOption.label}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {subject.variations.map((variation, index) => (
                <Box key={index} display="flex" gap="5px">
                  <FormControl sx={{ width: "300px" }} variant="standard">
                    <InputLabel>Хичээлийн төрөл</InputLabel>
                    <Select
                      label="Хичээлийн төрөл"
                      value={variation.type || ""}
                      onChange={(e) =>
                        updateVariation(subject.id, index, {
                          ...variation,
                          type: e.target.value,
                        })
                      }>
                      <MenuItem value=""></MenuItem>
                      {typeOfSubject.map((type, i) => (
                        <MenuItem value={type} key={i}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl sx={{ width: "300px" }} variant="standard">
                    <InputLabel>Багш</InputLabel>
                    <Select
                      label="Багш"
                      value={variation.professor || ""}
                      onChange={(e) =>
                        updateVariation(subject.id, index, {
                          ...variation,
                          professor: e.target.value,
                        })
                      }>
                      <MenuItem value=""></MenuItem>
                      {subject.professors.map((professor, i) => (
                        <MenuItem value={professor} key={i}>
                          {professor}
                        </MenuItem>
                      ))}
                      <Button
                        fullWidth
                        onClick={handleOpenProfessorDialog}
                        sx={{ minWidth: "0", minHeight: "100%" }}>
                        +
                      </Button>
                    </Select>
                  </FormControl>
                  <FormControl sx={{ width: "300px" }} variant="standard">
                    <InputLabel>Орох өдөр</InputLabel>
                    <Select
                      label="Орох өдөр"
                      value={variation.dayOfWeek || ""}
                      onChange={(e) =>
                        updateVariation(subject.id, index, {
                          ...variation,
                          dayOfWeek: e.target.value,
                        })
                      }>
                      <MenuItem value=""></MenuItem>
                      {daysOfWeek.map((type, i) => (
                        <MenuItem value={type} key={i}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl sx={{ width: "300px" }} variant="standard">
                    <InputLabel>Орох цаг</InputLabel>
                    <Select
                      label="Орох цаг"
                      value={variation.startTime || ""}
                      onChange={(e) =>
                        updateVariation(subject.id, index, {
                          ...variation,
                          startTime: e.target.value,
                          endTime:
                            variation.type === "Лаборатори"
                              ? handleEndTime(e.target.value, 150)
                              : handleEndTime(e.target.value, 90),
                        })
                      }>
                      <MenuItem value=""></MenuItem>
                      {timeOptions.map((type, i) => (
                        <MenuItem value={type} key={i}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <IconButton
                    type="button"
                    sx={{ p: 1 }}
                    onClick={(e) => removeVariation(subject.id, index)}>
                    <DeleteIcon />
                  </IconButton>
                  <Dialog
                    open={addProfessorOpen}
                    onClose={handleCloseProfessorDialog}>
                    <DialogTitle>Багш нэмэх</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Нэмэх багшийн нэрийг оруулна уу
                      </DialogContentText>
                      <TextField
                        error={inputProfessorNameError}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Нэр"
                        type="text"
                        fullWidth
                        variant="standard"
                        helperText="Нэр заавал оруулна уу"
                        value={inputProfessorName}
                        onChange={(e) => setInputProfessorName(e.target.value)}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseProfessorDialog}>
                        Буцах
                      </Button>
                      <Button onClick={() => handleAddProfessor(subject.id)}>
                        Нэмэх
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Box>
              ))}
              <Button
                fullWidth
                sx={{ color: "gray", marginTop: "10px" }}
                onClick={() => addVariation(subject.id)}>
                + Хувилбар нэмэх
              </Button>
            </Box>
          ))}
        </Box>
      </Box>
    </Dialog>
  );
};

export default NewFormDialog;
