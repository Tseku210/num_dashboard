import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { tokens } from "../../../theme";
import { useTheme } from "@mui/material/styles";
import { timeOptions, daysOfWeek } from "../../../utils/constants";

const cellWidth = 70;

const Schedule = ({ schedule }) => {
  const skip = Array(daysOfWeek.length).fill(0);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
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
                <TableCell sx={{ minWidth: cellWidth, maxWidth: cellWidth }}>
                  {time}
                </TableCell>
                {daysOfWeek.map((day, dayIndex) => {
                  if (skip[dayIndex] > 0) {
                    skip[dayIndex]--;
                    return null;
                  }

                  const arr = schedule[0].variations;
                  if (arr) {
                    const subject = arr[0];
                    const classDuration = arr[1];
                    skip[dayIndex] = classDuration - 1;
                    return (
                      <TableCell
                        key={dayIndex}
                        sx={{
                          minWidth: cellWidth,
                          maxWidth: cellWidth,
                          backgroundColor: "orange",
                          borderRadius: "10px",
                          borderRight: "1px solid #c2c2c2",
                          borderLeft: "1px solid #c2c2c2",
                        }}
                        rowSpan={classDuration}>
                        {subject}
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
  );
};

{
  /* <TableRow key={index}>
<TableCell>{time}</TableCell>
{daysOfWeek.map((day, dayIndex) => (
  <TableCell
    key={dayIndex}
    sx={{
      minWidth: cellWidth,
      maxWidth: cellWidth,
      // borderLeft: "1px solid grey",
    }}>
    {schedule && schedule[day] && schedule[day][time]}
  </TableCell>
))}
</TableRow> */
}

export default Schedule;
