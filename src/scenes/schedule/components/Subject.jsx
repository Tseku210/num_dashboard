import { Box, Paper } from "@mui/material";

const Subject = ({ subject, type, professor, color }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        height: "60px",
        width: "100%",
        backgroundColor: color,
        padding: "5px",
      }}>
      <Box display="flex" justifyContent="space-between" flexWrap="nowrap">
        <Box>{type}</Box>
        <Box>{professor}</Box>
      </Box>
      <Box sx={{ fontWeight: "500" }}>{subject}</Box>
    </Paper>
  );
};

export default Subject;
