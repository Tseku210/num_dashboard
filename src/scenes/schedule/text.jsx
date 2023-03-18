import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";

const daysOfWeek = [
  "Даваа",
  "Мягмар",
  "Лхагва",
  "Пүрэв",
  "Баасан",
  "Бямба",
  "Ням",
];

const timeSlots = [
  { start: "9:00am", end: "10:00am" },
  { start: "10:00am", end: "11:00am" },
  { start: "11:00am", end: "12:00pm" },
  // and so on...
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

const classInformation = {
  "07:40 - 08:25": { start: "07:40am", end: "08:25am", subject: "English" },
  "10:05 - 10:50": { start: "10:05am", end: "10:50am", subject: "Math" },
  "11:00 - 11:45": { start: "11:00am", end: "11:45am", subject: "Science" },
  // and so on...
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.root}`]: {
    borderRight: `1px solid ${theme.palette.divider}`,
    padding: "10px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function ClassSchedule() {
  // get theme
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // initialize the row span state
  const rowSpanState = {
    subject: null,
    end: null,
  };

  return (
    <Box padding="30px">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "130px", borderBottom: "none" }} />
              {daysOfWeek.map((day) => (
                <TableCell
                  sx={{
                    textAlign: "center",
                    backgroundColor: colors.primary[400],
                    borderTopRightRadius: "10px",
                    borderTopLeftRadius: "10px",
                    fontSize: "16px",
                  }}
                  key={day}>
                  {day}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {timeOptions.map((timeSlot, timeIndex) => {
              // get the class information for this time slot
              const classInfo = classInformation[timeSlot];
              const isStartOfRowSpan =
                classInfo && classInfo.start === timeSlot;

              // if this time slot is the start of a row span, update the row span state
              if (isStartOfRowSpan) {
                rowSpanState.subject = classInfo.subject;
                rowSpanState.end = classInfo.end;
              }

              // determine if this cell should have a row span
              const shouldRowSpan =
                rowSpanState.subject !== null && rowSpanState.end === timeSlot;

              // if this time slot is the end of a row span, clear the row span state
              if (shouldRowSpan) {
                rowSpanState.subject = null;
                rowSpanState.end = null;
              }

              // render the table cell
              return (
                <TableRow key={timeSlot}>
                  <StyledTableCell sx={{ color: "gray", width: "fit-content" }}>
                    {timeSlot}
                  </StyledTableCell>
                  {daysOfWeek.map((day) => (
                    <StyledTableCell
                      key={`${day}-${timeSlot}`}
                      rowSpan={shouldRowSpan ? rowSpanState.end : undefined}>
                      {shouldRowSpan && day === daysOfWeek[0]
                        ? rowSpanState.subject
                        : null}
                    </StyledTableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ClassSchedule;
