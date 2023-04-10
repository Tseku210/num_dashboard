import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Navbar from "./components/Navbar";
import { getTypes } from "../../utils/filters";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import GraphHomeLayout from "./components/GraphHomeLayout";

const Visualization = () => {
  const [data, setData] = useState([]);
  const [type, setType] = useState("");
  const [chosenArticle, setChosenArticle] = useState(null);
  const [searchArticle, setSearchArticle] = useState(null);
  const types = getTypes(data);

  useEffect(() => {
    fetch(process.env.REACT_APP_BACKEND_URL + "/graph")
      .then((res) => res.json())
      .then((graphData) => {
        setData(graphData);
      });
  }, []);

  const handleType = (e) => {
    setType(e.target.value);
  };

  const handleChosenArticle = (article) => {
    console.log(article);
    setChosenArticle(article);
  };

  const handleSearchArticle = (article) => {
    setSearchArticle(article);
  };

  /* FOR SEARCH AND NAVBAR */
  return (
    <Box m="0 auto" maxWidth="1200px" pr="20px" pl="20px">
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
          options={data}
          getOptionLabel={(option) => option.research_title}
          renderOption={(props, option) => (
            <Box {...props} key={option.id}>
              {option["research_title"]}
            </Box>
          )}
          onChange={(_, value) => {
            if (!value) return;
            handleSearchArticle(value);
            setType(value ? value["research_type"] : "");
          }}
          renderInput={(params) => (
            <TextField color="secondary" {...params} label="Гарчигаар хайх" />
          )}
        />
      </Box>
      {data.length > 0 ? (
        <GraphHomeLayout
          type={type}
          data={data}
          chosenArticle={chosenArticle}
          handleChosenArticle={handleChosenArticle}
          searchArticle={searchArticle}
          handleSearchArticle={handleSearchArticle}
        />
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignContent="center"
          height="100%">
          <CircularProgress color="secondary" />
        </Box>
      )}
    </Box>
  );
};

export default Visualization;
