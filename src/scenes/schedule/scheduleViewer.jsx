import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Header from "../../components/Header";
import Schedule from "./components/Schedule";
import { useState, forwardRef, useEffect } from "react";
import { AppBar, Dialog } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import { fetchProfessors, fetchSubjects } from "../../utils/fetch";
import { timeOptions, colorOptions, daysOfWeek } from "../../utils/constants";
import { FixedSizeList as List } from "react-window";
import * as React from "react";

// might fix later (there's a bug with height)
const ListboxComponent = React.forwardRef(function ListboxComponent(
  props,
  ref
) {
  const { children, ...other } = props;
  const itemData = React.Children.toArray(children);
  const itemCount = itemData.length;

  return (
    <Box ref={ref} {...other}>
      <List
        height={150}
        width="100%"
        itemSize={46}
        itemCount={itemCount}
        itemData={itemData}
        {...other}>
        {({ index, style }) => <Box style={style}>{itemData[index]}</Box>}
      </List>
    </Box>
  );
});

const ScheduleItem = ({ bgColor = "gray", type, subjectName }) => {
  return (
    <Box
      height="100px"
      width="200px"
      p="10px"
      sx={{ backgroundColor: bgColor, borderRadius: "5%" }}>
      <Box>{type}</Box>
      <Box>{subjectName}</Box>
    </Box>
  );
};

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

const ScheduleViewer = () => {
  const exampleSchedule = {
    Даваа: {
      "07:40 - 08:25": ["Math 101 - Lecture", 2],
      "09:20 - 10:05": ["English 101 - Lecture", 2],
    },
    Мягмар: {
      "09:20 - 10:05": ["Physics 101 - Laboratory", 3],
    },
    Лхагва: {
      "11:45 - 12:30": ["Algorithm - Lecture", 2],
    },
  };

  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpen = async () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <Box m="0 auto" maxWidth="1200px" pr="20px" pl="20px">
      <Header title="Смарт Хуваарь" subtitle="Хүссэн хувиараа олцгооё" />
      <Button
        variant="contained"
        sx={{ width: "100%", marginBottom: "10px" }}
        color="secondary"
        onClick={handleClickOpen}>
        + хуваарь нэмэх
      </Button>
      <ScheduleFormDialog open={openDialog} onClose={handleClose} />
      <Schedule schedule={exampleSchedule} />
    </Box>
  );
};

export default ScheduleViewer;
