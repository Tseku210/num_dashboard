import { Box } from "@mui/system";
import { useState } from "react";
import Graph from "./Graph/Graph";
import Article from "./Article";

const GraphHomeLayout = ({
  data,
  type,
  chosenArticle,
  handleChosenArticle,
  searchArticle,
  handleSearchArticle,
}) => {
  return (
    <Box display="flex" maxHeight="100%">
      <Graph
        type={type}
        data={data}
        chosenArticle={chosenArticle}
        handleArticle={handleChosenArticle}
        searchArticle={searchArticle}
        handleSearchArticle={handleSearchArticle}
      />
      <Article article={chosenArticle} />
    </Box>
  );
};

export default GraphHomeLayout;
