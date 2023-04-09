import { Box, Paper } from "@mui/material";
import { alpha } from "@mui/material/styles";

const Subject = ({ subject, type, professor, color }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        height: type === "Лаборатори" ? "90px" : "60px",
        width: "100%",
        backgroundColor: alpha(color, 0.2),
        border: `2px solid ${color}`,
        padding: "5px",
        transition: "all 0.3s ease-in-out",
        // "&:hover": {
        //   width: "150%",
        //   transform: "scale(1.1)",
        // },
      }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box
          sx={{
            backgroundColor: alpha(color, 0.7),
            padding: "2px 5px",
            borderRadius: "5px",
            fontWeight: "500",
            color: "white",
          }}>
          {type}
        </Box>
        <Box
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: color,
          }}>
          {professor}
        </Box>
      </Box>
      <Box
        sx={{
          fontWeight: "500",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          color: color,
          filter: "contrast(150%)",
        }}>
        {subject}
      </Box>
    </Paper>
  );
};

export default Subject;
