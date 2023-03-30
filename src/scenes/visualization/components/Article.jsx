import { useTheme } from "@emotion/react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { tokens } from "../../../theme";
import { useState } from "react";

const Article = ({ article }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);

  return (
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        height: "fit-content",
        padding: "20px",
        outline: article?.wos && "1px solid #FFD73B",
        backgroundColor:
          theme.palette.mode === "dark" ? colors.primary[500] : "default",
      }}>
      {article ? (
        <Box display="flex" flexDirection="column" gap="10px">
          <Box>
            <Typography color="grey">Гарчиг</Typography>
            <Typography variant="h4">{article["research_title"]}</Typography>
          </Box>
          <Box>
            <Typography color="grey">Агуулга</Typography>
            <Collapse collapsedSize="100px" in={open} timeout="auto">
              <Typography variant="body2">{article["abstract_mn"]}</Typography>
            </Collapse>
            <Button
              sx={{ width: "100%", padding: "0px" }}
              onClick={() => setOpen(!open)}
              endIcon={
                open ? (
                  <ArrowDropUpIcon sx={{ color: colors.primary[300] }} />
                ) : (
                  <ArrowDropDownIcon sx={{ color: colors.primary[300] }} />
                )
              }></Button>
          </Box>
          <Box>
            <Typography color="grey">Бусад мэдээлэл</Typography>
            <TableContainer
              component={Paper}
              sx={{
                backgroundColor:
                  theme.palette.mode === "dark" && colors.primary[500],
              }}>
              <Table aria-label="extra detail table" size="small">
                <TableBody>
                  <TableRow>
                    <TableCell component="td" sx={{ fontWeight: "bold" }}>
                      Судалгааны ID
                    </TableCell>

                    <TableCell component="td">
                      {article["research_id"]}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="td" sx={{ fontWeight: "bold" }}>
                      Хуудасны тоо
                    </TableCell>
                    <TableCell component="td">
                      {article["page_number"]}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="td" sx={{ fontWeight: "bold" }}>
                      Нийтэлсэн өдөр
                    </TableCell>
                    <TableCell component="td">
                      {article["publication_date"]}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="td" sx={{ fontWeight: "bold" }}>
                      Судалгааны төрөл
                    </TableCell>
                    <TableCell component="td">
                      {article["research_type"]}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="td" sx={{ fontWeight: "bold" }}>
                      ISSN дугаар
                    </TableCell>
                    <TableCell component="td">
                      {article["journal_ISSN"]}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="td" sx={{ fontWeight: "bold" }}>
                      Линк
                    </TableCell>
                    <TableCell component="td">
                      <Link
                        href="#"
                        onClick={() => {
                          console.log("hello");
                        }}>
                        Цааш унших
                      </Link>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center">
          <LightbulbIcon sx={{ fontSize: "100px", color: "grey" }} />
          <Typography>Мэдээлэл байхгүй байна</Typography>
        </Box>
      )}
    </Paper>
  );
};

export default Article;
