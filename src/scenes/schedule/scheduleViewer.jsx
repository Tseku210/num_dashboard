import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Header from "../../components/Header";
import Schedule from "./components/Schedule";
import { useState, useEffect } from "react";
import * as React from "react";
import NewFormDialog from "./components/ScheduleFormDialog";

const ScheduleViewer = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const storedSchedule = localStorage.getItem("schedule");
    if (storedSchedule) {
      setSchedule(JSON.parse(storedSchedule));
    }
  }, []);

  const handleSchedule = (newSchedule) => {
    setSchedule(newSchedule);
    localStorage.setItem("schedule", JSON.stringify(newSchedule));
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
