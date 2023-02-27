import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Data from "../../data/paper-journals.json";
import Navbar from "./components/Navbar";
import { getTypes } from "../../utils/filters";
import { Autocomplete, TextField } from "@mui/material";

const Visualization = () => {
  const [type, setType] = useState("Байгалийн ухаан");
  const types = getTypes(Data);

  const handleType = (e) => {
    console.log(e);
    setType(e.target.value);
  };

  /* FOR SEARCH AND NAVBAR */
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="VISUALIZATION"
          subtitle="Эрдэм шинжилгээний өгүүллээ хайгаарай"
        />
        <Navbar type={type} types={types} handleType={handleType} />
        <Autocomplete
          sx={{ width: 300 }}
          freeSolo
          id="searchbar"
          options={Data.map((option) => option["research_title"])}
          renderInput={(params) => (
            <TextField color="secondary" {...params} label="Гарчигаар хайх" />
          )}
        />
      </Box>
      <Box>hello</Box>
    </Box>
  );
};

export default Visualization;
