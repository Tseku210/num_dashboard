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
import NewFormDialog from "./components/ScheduleFormDialog";

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
  const [schedule, setSchedule] = useState([]);

  const handleSchedule = (newSchedule) => {
    setSchedule(newSchedule);
  };

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
      {/* <ScheduleFormDialog open={openDialog} onClose={handleClose} /> */}
      <NewFormDialog
        open={openDialog}
        onClose={handleClose}
        handleSchedule={handleSchedule}
      />
      <Schedule schedule={schedule} />
    </Box>
  );
};

export default ScheduleViewer;
