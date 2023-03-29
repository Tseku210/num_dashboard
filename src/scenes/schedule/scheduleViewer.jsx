import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Header from "../../components/Header";
import Schedule from "../../components/Schedule";
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
import { fetchSubjects } from "../../utils/fetch";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);

  const handleClickOpen = async () => {
    // Fetch subjects only if data has not been fetched yet
    if (!dataFetched) {
      try {
        const data = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/subjects`
        );
        // const data = await response.json();
        setSubjects(data);
        setDataFetched(true);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    }
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <Box m="20px">
      <Header title="Смарт Хуваарь" subtitle="Хүссэн хувиараа олцгооё" />
      <Button
        variant="contained"
        sx={{ width: "100%", marginBottom: "10px" }}
        color="secondary"
        onClick={handleClickOpen}>
        + хуваарь нэмэх
      </Button>
      <Dialog
        fullScreen
        open={openDialog}
        onClose={handleClose}
        TransitionComponent={Transition}>
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
            <TextField
              fullWidth
              label="Хицээл хайх"
              variant="outlined"
              sx={{ marginBottom: "20px" }}
            />
            <Autocomplete
              sx={{ width: 300 }}
              freeSolo
              id="searchbar"
              options={subjects}
              // getOptionLabel={(option) => option.research_title}
              renderOption={(props) => <Box {...props}>{option}</Box>}
              // onChange={(_, value) => {
              //   if (!value) return;
              //   handleSearchArticle(value);
              //   setType(value ? value["research_type"] : "");
              // }}
              renderInput={(params) => (
                <TextField
                  color="secondary"
                  {...params}
                  label="Гарчигаар хайх"
                />
              )}
            />
            <FormControl
              fullWidth
              variant="outlined"
              sx={{ marginBottom: "20px" }}>
              <InputLabel>Багш сонгох</InputLabel>
              <Select label="Багш сонгох">
                <MenuItem value="teacher1">Багш 1</MenuItem>
                <MenuItem value="teacher2">Багш 2</MenuItem>
                <MenuItem value="teacher3">Багш 3</MenuItem>
              </Select>
            </FormControl>
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
                    {/* Add more time options */}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Dialog>
      <Schedule schedule={exampleSchedule} />
    </Box>
  );
};

export default ScheduleViewer;
