import { useQuery } from "@apollo/client";
import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import {
  GET_CATEGORIES,
  GET_COMMENTS,
  GET_TOPICS_BY_CATEGORY,
} from "../../mutations/queries";
import { useEffect, useState } from "react";
import Category from "./components/Category";
import Chat from "./components/Chat";
import { useApolloClient } from "@apollo/client";

const Forum = () => {
  const client = useApolloClient();
  const { loading, error, data } = useQuery(GET_CATEGORIES);
  const [categories, setCategories] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [openCategory, setOpenCategory] = useState(null);

  useEffect(() => {
    if (!loading && !error && data) {
      setCategories(data.getCategories);
      console.log(data);
    }
  }, [loading, error, data]);

  const handleCategoryClick = async (categoryId) => {
    if (categoryId === openCategory) {
      setOpenCategory(null);
      setTopics([]);
    } else {
      setOpenCategory(categoryId);
      const result = await client.query({
        query: GET_TOPICS_BY_CATEGORY,
        variables: { category: categoryId },
      });
      setTopics(result.data.getTopicByCategory);
    }
  };

  const handleTopicClick = async (topicId) => {
    // const result = await client.query({
    //   query: GET_COMMENTS,
    //   variables: { topic: topicId },
    // });
    // setComments(result.data.getComments);
    setSelectedTopic(topicId);
    // console.log(comments);
  };

  return (
    <Box display="flex" height="91%" sx={{ overflowY: "auto" }}>
      <List sx={{ overflowY: "auto" }}>
        {categories?.map((category) => (
          <Box key={category._id}>
            <ListItemButton onClick={() => handleCategoryClick(category._id)}>
              <ListItemText primary={category.name} />
            </ListItemButton>
            <Collapse
              in={openCategory === category._id}
              timeout="auto"
              unmountOnExit>
              <List
                component="div"
                sx={{ backgroundColor: grey[200], paddingLeft: "10px" }}
                disablePadding>
                {topics.map((topic) => (
                  <ListItemButton
                    key={topic._id}
                    onClick={() => handleTopicClick(topic._id)}>
                    <ListItemText primary={topic.name} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </Box>
        ))}
      </List>
      {selectedTopic && <Chat topicId={selectedTopic} />}
    </Box>
  );
};

export default Forum;
