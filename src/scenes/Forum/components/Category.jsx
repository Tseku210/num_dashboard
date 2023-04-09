import { useQuery } from "@apollo/client";
import { GET_TOPICS_BY_CATEGORY } from "../../../mutations/queries";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Topic from "./Topic";

const Category = ({ category }) => {
  const { loading, error, data } = useQuery(GET_TOPICS_BY_CATEGORY, {
    variables: {
      category: category._id,
    },
  });
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    if (!loading && !error && data) {
      setTopics(data.getTopicByCategory);
    }
  }, [loading, error, data]);

  return (
    <Box>
      {topics.map((topic) => (
        <Topic key={topic._id} topic={topic} />
      ))}
    </Box>
  );
};

export default Category;
