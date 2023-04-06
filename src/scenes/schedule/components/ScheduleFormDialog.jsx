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
import ListboxComponent from "./ListboxComponent";
import ScheduleItem from "./ScheduleItem";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import {
  daysOfWeek,
  timeOptions,
  colorOptions,
  typeOfSubject,
} from "../../../utils/constants";
import { fetchSubjects, fetchProfessors } from "../../../utils/fetch";
import { uniqueId } from "lodash";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ScheduleFormDialog = ({ open, onClose }) => {
  const [subjects, setSubjects] = useState([]);
  const [subject, setSubject] = useState("");
  const [professors, setProfessors] = useState([]);
  const [professor, setProfessor] = useState("");
  const [lecture, setLecture] = useState(false);
  const [seminar, setSeminar] = useState(false);
  const [laboratory, setLaboratory] = useState(false);
  const [lectureDay, setLectureDay] = useState(daysOfWeek[0]);
  const [lectureTime, setLectureTime] = useState("07:40");
  const [seminarDay, setSeminarDay] = useState(daysOfWeek[0]);
  const [seminarTime, setSeminarTime] = useState("07:40");
  const [laboratoryDay, setLaboratoryDay] = useState(daysOfWeek[0]);
  const [laboratoryTime, setLaboratoryTime] = useState("07:40");
  const [selectedColor, setSelectedColor] = useState(colorOptions[0].value);

  useEffect(() => {
    const fetchSubjectValues = async () => {
      const subjects = await fetchSubjects();
      setSubjects(subjects);
    };
    fetchSubjectValues();
  }, []);

  const handleLectureDayChange = (event) => {
    setLectureDay(event.target.value);
  };

  const handleLectureTimeChange = (event) => {
    setLectureTime(event.target.value);
  };

  const handleSeminarDayChange = (event) => {
    setSeminarDay(event.target.value);
  };

  const handleSeminarTimeChange = (event) => {
    setSeminarTime(event.target.value);
  };

  const handleLaboratoryDayChange = (event) => {
    setLaboratoryDay(event.target.value);
  };

  const handleLaboratoryTimeChange = (event) => {
    setLaboratoryTime(event.target.value);
  };

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  const fetchProfessorValues = async (event, value) => {
    if (value == null) {
      setSubject(value.name);
      setProfessor("");
      return;
    }
    setSubject(value.name);
    const professors = await fetchProfessors(value.id);
    setProfessors(professors);
    setProfessor("");
  };

  const handleProfessor = (event) => {
    setProfessor(event.target.value);
  };

  const toggleLecture = () => {
    setLecture(!lecture);
  };

  const toggleSeminar = () => {
    setSeminar(!seminar);
  };

  const toggleLaboratory = () => {
    setLaboratory(!laboratory);
  };

  const addSubject = () => {};

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}>
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Хуваарь нэмэх
          </Typography>
          <Button autoFocus color="inherit" onClick={onClose}>
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
              onChange={fetchProfessorValues}
              isOptionEqualToValue={(option, value) =>
                option.id === value.id && option.name === value.name
              }
              renderInput={(params) => (
                <TextField {...params} label="Хичээл" variant="standard" />
              )}
              ListboxComponent={ListboxComponent}
            />
            <Button variant="contained" onClick={addSubject}>
              + Хичээл нэмэх
            </Button>
          </Box>

          <Box display="flex">
            <Autocomplete
              sx={{ width: "300px" }}
              options={subjects}
              getOptionLabel={(option) => option.name}
              id="subject"
              clearOnEscape
              onChange={fetchProfessorValues}
              isOptionEqualToValue={(option, value) =>
                option.id === value.id && option.name === value.name
              }
              // renderOption={(props, option) => (
              //   <Box {...props} key={option.id}>
              //     {option.name}
              //   </Box>
              // )}
              renderInput={(params) => (
                <TextField {...params} label="Хичээл" variant="standard" />
              )}
              ListboxComponent={ListboxComponent}
            />
            <FormControl sx={{ width: "300px" }} variant="standard">
              <InputLabel>Багш сонгох</InputLabel>
              <Select
                label="Багш сонгох"
                defaultValue=""
                value={professor}
                onChange={handleProfessor}>
                <MenuItem value="">Багш сонго</MenuItem>
                {professors.map((professor, i) => (
                  <MenuItem value={professor} key={i}>
                    {professor}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={lecture} onChange={toggleLecture} />}
              label="Лекц"
            />
            {lecture && (
              <Box pt="20px" pb="20px">
                <FormControl sx={{ width: "300px" }} variant="standard">
                  <InputLabel>Орох өдөр</InputLabel>
                  <Select
                    defaultValue={daysOfWeek[0]}
                    onChange={handleLectureDayChange}>
                    {daysOfWeek.map((day, index) => (
                      <MenuItem key={index} value={day}>
                        {day}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl sx={{ width: "300px" }} variant="standard">
                  <InputLabel>Эхлэх цаг</InputLabel>
                  <Select
                    defaultValue="07:40"
                    onChange={handleLectureTimeChange}>
                    {timeOptions.map((time, index) => (
                      <MenuItem key={index} value={time}>
                        {time}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            )}
            <FormControlLabel
              control={<Checkbox checked={seminar} onChange={toggleSeminar} />}
              label="Семинар"
            />
            {seminar && (
              <Box pt="20px" pb="20px">
                <FormControl sx={{ width: "300px" }} variant="standard">
                  <InputLabel>Орох өдөр</InputLabel>
                  <Select
                    defaultValue={daysOfWeek[0]}
                    onChange={handleSeminarDayChange}>
                    {daysOfWeek.map((day, index) => (
                      <MenuItem key={index} value={day}>
                        {day}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl sx={{ width: "300px" }} variant="standard">
                  <InputLabel>Эхлэх цаг</InputLabel>
                  <Select
                    defaultValue="07:40"
                    onChange={handleSeminarTimeChange}>
                    {timeOptions.map((time, index) => (
                      <MenuItem key={index} value={time}>
                        {time}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            )}
            <FormControlLabel
              control={
                <Checkbox checked={laboratory} onChange={toggleLaboratory} />
              }
              label="Лаборатори"
            />
            {laboratory && (
              <Box pt="20px" pb="20px">
                <FormControl sx={{ width: "300px" }} variant="standard">
                  <InputLabel>Орох өдөр</InputLabel>
                  <Select defaultValue={daysOfWeek[0]}>
                    {daysOfWeek.map((day, index) => (
                      <MenuItem key={index} value={day}>
                        {day}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl sx={{ width: "300px" }} variant="standard">
                  <InputLabel>Эхлэх цаг</InputLabel>
                  <Select defaultValue="07:40">
                    {timeOptions.map((time, index) => (
                      <MenuItem key={index} value={time}>
                        {time}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            )}
          </FormGroup>
          <FormControl sx={{ width: "300px" }} variant="outlined">
            <InputLabel>Өнгө сонгох</InputLabel>
            <Select
              label="Өнгө сонгох"
              value={selectedColor}
              onChange={handleColorChange}>
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
        </Box>
        <Box
          margin="0 auto"
          p="25px"
          display="flex"
          flexDirection="column"
          gap="30px">
          {lecture && (
            <ScheduleItem
              type="Лекц"
              subjectName={subject}
              bgColor={selectedColor}
            />
          )}
          {seminar && (
            <ScheduleItem
              type="Семинар"
              subjectName={subject}
              bgColor={selectedColor}
            />
          )}
          {laboratory && (
            <ScheduleItem
              type="Лаборатори"
              subjectName={subject}
              bgColor={selectedColor}
            />
          )}
        </Box>
      </Box>
    </Dialog>
  );
};

// export default ScheduleFormDialog;

const defaultVariation = {
  type: "",
  dayOfWeek: "",
  professor: "",
  startTime: "",
};

const NewFormDialog = ({ open, onClose }) => {
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

  const addSubject = (subject) => {
    if (!subject) return;
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
            variations: [{}], // Initialize with an empty variation
            professors: [], // Initialize with an empty professors array
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
    // ... logic to remove the variation at the given index for the subject with the given ID
  };

  const removeSubject = (subjectId) => {
    // ... logic to remove the subject with the given ID
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

  const handleSubmit = () => {
    console.log(formState);
    // onClose();
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}>
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
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
              <Typography variant="h6">{subject.name}</Typography>
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
