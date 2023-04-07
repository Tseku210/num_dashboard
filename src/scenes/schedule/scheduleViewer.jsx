import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Header from "../../components/Header";
import Schedule from "./components/Schedule";
import { useState, forwardRef, useEffect } from "react";
import * as React from "react";
import NewFormDialog from "./components/ScheduleFormDialog";

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
