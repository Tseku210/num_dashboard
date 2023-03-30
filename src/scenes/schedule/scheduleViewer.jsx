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

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ScheduleFormDialog = ({ open, onClose }) => {
  const [subjects, setSubjects] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [professor, setProfessor] = useState("");
  const [lecture, setLecture] = useState(false);
  const [seminar, setSeminar] = useState(false);
  const [laboratory, setLaboratory] = useState(false);

  useEffect(() => {
    const fetchSubjectValues = async () => {
      const subjects = await fetchSubjects();
      setSubjects(subjects);
    };
    fetchSubjectValues();
  }, []);

  const fetchProfessorValues = async (event, value) => {
    if (value == null) {
      return;
    }
    console.log(event, value.id);
    const professors = await fetchProfessors(value.id);
    console.log(professors);
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
      <Box p="25px" display="flex" flexDirection="column" gap="25px">
        <Box display="flex">
          <Autocomplete
            sx={{ width: "300px" }}
            fullWidth
            options={subjects}
            getOptionLabel={(option) => option.name}
            id="subject"
            clearOnEscape
            onChange={fetchProfessorValues}
            isOptionEqualToValue={(option, value) =>
              option.id === value.id && option.name === value.name
            }
            renderOption={(props, option) => (
              <Box {...props} key={option.id}>
                {option.name}
              </Box>
            )}
            renderInput={(params) => (
              <TextField {...params} label="Хичээл" variant="standard" />
            )}
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
            <Grid container spacing={2} p="20px">
              <Grid item xs={6}>
                <TextField
                  id="time"
                  label="Эхлэх цаг"
                  type="time"
                  defaultValue="07:30"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="time"
                  label="Дуусах цаг"
                  type="time"
                  defaultValue="08:30"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                />
              </Grid>
            </Grid>
          )}
          <FormControlLabel
            control={<Checkbox checked={seminar} onChange={toggleSeminar} />}
            label="Семинар"
          />
          <FormControlLabel
            control={
              <Checkbox checked={laboratory} onChange={toggleLaboratory} />
            }
            label="Лаборатори"
          />
        </FormGroup>
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
      {/* <Dialog fullScreen open={openDialog} onClose={handleClose}>
        <AppBar sx={{ position: "relative" }}>
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
            <Button autoFocus color="inherit" onClick={handleClose}>
              хадгалах
            </Button>
          </Toolbar>
        </AppBar>
        <Box sx={{ padding: "20px" }}>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="Лекц" />
                  <FormControlLabel control={<Checkbox />} label="Семинар" />
                  <FormControlLabel control={<Checkbox />} label="Лаборатори" />
                </FormGroup>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Цаг</InputLabel>
                  <Select label="Цаг">
                    <MenuItem value="time1">07:40 - 08:25</MenuItem>
                    <MenuItem value="time2">08:25 - 09:10</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Dialog> */}
      <ScheduleFormDialog open={openDialog} onClose={handleClose} />
      <Schedule schedule={exampleSchedule} />
    </Box>
  );
};

export default ScheduleViewer;
