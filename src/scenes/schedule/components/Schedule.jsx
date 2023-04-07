import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
} from "@mui/material";
import { tokens } from "../../../theme";
import { useTheme } from "@mui/material/styles";
import { timeOptions, daysOfWeek } from "../../../utils/constants";
import { useState } from "react";
import Subject from "./Subject";

const cellWidth = 70;

const findSubjectAtTime = (subjects, dayIndex, time) => {
  for (const subject of subjects) {
    for (const variation of subject.variations) {
      if (
        daysOfWeek[dayIndex] === variation.dayOfWeek &&
        time === variation.startTime
      ) {
        let classDuration;

        if (subject.type === "Лаборатори") {
          classDuration = 3;
        } else {
          classDuration = 2;
        }
        return {
          subject: subject.name,
          type: variation.type,
          professor: variation.professor,
          classDuration,
          color: subject.color,
        };
      }
    }
  }
  return null;
};

const Schedule = () => {
  const schedule = [
    [
      {
        id: "1",
        name: "Психотерапи I",
        color: "#2196F3",
        variations: [
          {
            type: "Лекц",
            professor: "Н.Должин",
            dayOfWeek: "Даваа",
            startTime: "07:40",
            endTime: "09:10",
          },
          {
            type: "Семинар",
            professor: "Н.Должин",
            dayOfWeek: "Даваа",
            startTime: "10:05",
            endTime: "11:35",
          },
        ],
        professors: ["Н.Должин"],
      },
      {
        id: "2",
        name: "Алгоритмын үндэс",
        color: "#FF9800",
        variations: [
          {
            type: "Лекц",
            professor: "Д.Гармаа",
            dayOfWeek: "Мягмар",
            startTime: "11:00",
            endTime: "12:30",
          },
          {
            type: "Семинар",
            professor: "Д.Гармаа",
            dayOfWeek: "Даваа",
            startTime: "09:20",
            endTime: "10:50",
          },
        ],
        professors: [
          "Д.Гармаа",
          "Д.Нанзадрагчаа",
          "Б.Энхтуул",
          "Б.Наранчимэг",
          "Т.Цэрэннадмид",
          "Ч.Алтангэрэл",
          "Ч.Намуун-Эрдэнэ",
          "И.Бямбасүрэн",
        ],
      },
    ],
    [
      {
        id: "1",
        name: "Психотерапи I",
        color: "#2196F3",
        variations: [
          {
            type: "Лекц",
            professor: "Н.Должин",
            dayOfWeek: "Даваа",
            startTime: "07:40",
            endTime: "09:10",
          },
          {
            type: "Семинар",
            professor: "Н.Должин",
            dayOfWeek: "Даваа",
            startTime: "10:05",
            endTime: "11:35",
          },
        ],
        professors: ["Н.Должин"],
      },
      {
        id: "2",
        name: "Алгоритмын үндэс",
        color: "#FF9800",
        variations: [
          {
            type: "Лекц",
            professor: "Д.Гармаа",
            dayOfWeek: "Мягмар",
            startTime: "11:00",
            endTime: "12:30",
          },
          {
            type: "Семинар",
            professor: "Д.Гармаа",
            dayOfWeek: "Мягмар",
            startTime: "07:40",
            endTime: "09:10",
          },
        ],
        professors: [
          "Д.Гармаа",
          "Д.Нанзадрагчаа",
          "Б.Энхтуул",
          "Б.Наранчимэг",
          "Т.Цэрэннадмид",
          "Ч.Алтангэрэл",
          "Ч.Намуун-Эрдэнэ",
          "И.Бямбасүрэн",
        ],
      },
    ],
    [
      {
        id: "1",
        name: "Психотерапи I",
        color: "#2196F3",
        variations: [
          {
            type: "Лекц",
            professor: "Н.Должин",
            dayOfWeek: "Даваа",
            startTime: "07:40",
            endTime: "09:10",
          },
          {
            type: "Семинар",
            professor: "Н.Должин",
            dayOfWeek: "Даваа",
            startTime: "09:20",
            endTime: "10:50",
          },
        ],
        professors: ["Н.Должин"],
      },
      {
        id: "2",
        name: "Алгоритмын үндэс",
        color: "#FF9800",
        variations: [
          {
            type: "Лекц",
            professor: "Д.Гармаа",
            dayOfWeek: "Мягмар",
            startTime: "11:00",
            endTime: "12:30",
          },
          {
            type: "Семинар",
            professor: "Д.Гармаа",
            dayOfWeek: "Даваа",
            startTime: "09:20",
            endTime: "10:50",
          },
        ],
        professors: [
          "Д.Гармаа",
          "Д.Нанзадрагчаа",
          "Б.Энхтуул",
          "Б.Наранчимэг",
          "Т.Цэрэннадмид",
          "Ч.Алтангэрэл",
          "Ч.Намуун-Эрдэнэ",
          "И.Бямбасүрэн",
        ],
      },
    ],
    [
      {
        id: "1",
        name: "Психотерапи I",
        color: "#2196F3",
        variations: [
          {
            type: "Лекц",
            professor: "Н.Должин",
            dayOfWeek: "Даваа",
            startTime: "07:40",
            endTime: "09:10",
          },
          {
            type: "Семинар",
            professor: "Н.Должин",
            dayOfWeek: "Даваа",
            startTime: "09:20",
            endTime: "10:50",
          },
        ],
        professors: ["Н.Должин"],
      },
      {
        id: "2",
        name: "Алгоритмын үндэс",
        color: "#FF9800",
        variations: [
          {
            type: "Лекц",
            professor: "Д.Гармаа",
            dayOfWeek: "Мягмар",
            startTime: "11:00",
            endTime: "12:30",
          },
          {
            type: "Семинар",
            professor: "Д.Гармаа",
            dayOfWeek: "Мягмар",
            startTime: "07:40",
            endTime: "09:10",
          },
        ],
        professors: [
          "Д.Гармаа",
          "Д.Нанзадрагчаа",
          "Б.Энхтуул",
          "Б.Наранчимэг",
          "Т.Цэрэннадмид",
          "Ч.Алтангэрэл",
          "Ч.Намуун-Эрдэнэ",
          "И.Бямбасүрэн",
        ],
      },
    ],
  ];
  const skip = Array(daysOfWeek.length).fill(0);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
      <Pagination
        variant="outlined"
        size="small"
        count={schedule.length}
        page={currentPage}
        onChange={(_, value) => setCurrentPage(value)}
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 1,
          marginBottom: 1,
        }}
      />
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: theme.palette.mode === "dark" && colors.primary[500],
        }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ minWidth: cellWidth, maxWidth: cellWidth }}>
                Цаг
              </TableCell>
              {daysOfWeek.map((day, index) => (
                <TableCell
                  key={index}
                  sx={{
                    minWidth: cellWidth,
                    maxWidth: cellWidth,
                    textAlign: "center",
                    borderLeft: "1px solid #c2c2c2",
                  }}>
                  {day}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {timeOptions.map((time, index) => {
              return (
                <TableRow key={index}>
                  <TableCell
                    sx={{
                      minWidth: cellWidth,
                      maxWidth: cellWidth,
                      padding: "5px",
                    }}>
                    {time}
                  </TableCell>
                  {daysOfWeek.map((_, dayIndex) => {
                    if (skip[dayIndex] > 0) {
                      skip[dayIndex]--;
                      return null;
                    }

                    const result = findSubjectAtTime(
                      schedule[currentPage - 1],
                      dayIndex,
                      time
                    );

                    if (result) {
                      const { subject, type, professor, classDuration, color } =
                        result;
                      skip[dayIndex] = classDuration - 1;
                      return (
                        <TableCell
                          key={dayIndex}
                          sx={{
                            minWidth: cellWidth,
                            maxWidth: cellWidth,
                            borderRadius: "10px",
                            padding: "0",
                            borderRight: "1px solid #c2c2c2",
                            borderLeft: "1px solid #c2c2c2",
                          }}
                          rowSpan={classDuration}>
                          <Subject
                            subject={subject}
                            type={type}
                            professor={professor}
                            color={color}
                          />
                        </TableCell>
                      );
                    }

                    return (
                      <TableCell
                        key={dayIndex}
                        sx={{
                          minWidth: cellWidth,
                          maxWidth: cellWidth,
                          borderLeft: "1px solid #c2c2c2",
                        }}
                      />
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Schedule;
