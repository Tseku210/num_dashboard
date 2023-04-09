import { useQuery, useMutation } from "@apollo/client";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { ADD_COMMENT } from "../../../mutations/mutations";
import { GET_COMMENTS } from "../../../mutations/queries";
import { useState } from "react";
import { useEffect } from "react";

const Chat = ({ topicId }) => {
  const { loading, error, data } = useQuery(GET_COMMENTS, {
    variables: { topic: topicId },
  });

  const [comments, setComments] = useState([]);

  const [addComment] = useMutation(ADD_COMMENT, {
    refetchQueries: [{ query: GET_COMMENTS, variables: { topic: topicId } }],
  });

  useEffect(() => {
    if (!loading && !error && data) {
      setComments(data.getComments);
    }
    console.log(comments);
  }, [data, loading, error]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const comment = event.target.comment.value;
    event.target.comment.value = "";
    addComment({ variables: { comment, topic: topicId } });
  };

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <Box
      width="100%"
      height="100%"
      p="20px"
      sx={{ backgroundColor: grey[200] }}>
      <List sx={{ overflowY: "auto" }}>
        {comments?.map((comment) => (
          <ListItem key={comment._id}>
            <ListItemText primary={comment._id} secondary={comment.comment} />
          </ListItem>
        ))}
      </List>
      <form
        onSubmit={handleFormSubmit}
        style={{
          position: "fixed",
          bottom: 0,
          marginBottom: "10px",
          width: "60%",
        }}>
        <Box display="flex">
          <TextField
            id="comment"
            name="comment"
            label="Message"
            variant="outlined"
            autoComplete="off"
            fullWidth
          />
          <Button variant="standard" color="secondary" type="submit">
            Илгээх
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Chat;
