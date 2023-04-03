import Box from "@mui/material/Box";

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

export default ScheduleItem;
