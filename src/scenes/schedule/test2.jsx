import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const timeOptions = [
  "07:40 - 08:25",
  "08:25 - 09:10",
  "09:20 - 10:05",
  "10:05 - 10:50",
  "11:00 - 11:45",
  "11:45 - 12:30",
  "12:40 - 13:25",
  "13:25 - 14:10",
  "14:20 - 15:05",
  "15:05 - 15:50",
  "16:00 - 16:45",
  "16:45 - 17:30",
  "17:40 - 18:25",
  "18:25 - 19:10",
  "19:20 - 20:05",
  "20:05 - 20:50",
  "21:00 - 21:45",
  "21:45 - 22:30",
];

const ScheduleTable = () => {
  const schedule = [
    ["Math 101 - Lecture", "", "", "English 102 - Seminar", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["History 104 - Lecture", "", "", "", "", "", "Science 105 - Laboratory"],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
  ];
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            {daysOfWeek.map((day) => (
              <TableCell key={day}>{day}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {schedule.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{timeOptions[index]}</TableCell>
              {row.map((subject, index) => (
                <TableCell key={index}>{subject}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ScheduleTable;
