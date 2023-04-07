import { useQuery } from "@apollo/client";
import { Box } from "@mui/material";
import { GET_CATEGORIES } from "../../mutations/mutations";
import { useEffect, useState } from "react";
import Category from "./components/Category";

const Forum = () => {
  const { loading, error, data } = useQuery(GET_CATEGORIES);
  const [categories, setCategories] = useState([
    { _id: "1", getTopicByCategory: "" },
  ]);

  useEffect(() => {
    if (!loading && !error && data) {
      setCategories(data.getCategories);
    }
  }, [loading, error, data]);

  return (
    <Box>
      {categories.map((category) => (
        <Category key={category._id} category={category} />
      ))}
    </Box>
  );
};

export default Forum;
