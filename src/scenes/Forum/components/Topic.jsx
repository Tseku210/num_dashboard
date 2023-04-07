import { useMutation, useQuery } from "@apollo/client";
import { ADD_COMMENT, GET_COMMENTS } from "../../../mutations/mutations";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

const Topic = ({ topic }) => {
  const { loading, error, data } = useQuery(GET_COMMENTS, {
    variables: { topic: topic._id },
  });
  const [comments, setComments] = useState([]);
  const [addComment] = useMutation(ADD_COMMENT);

  useEffect(() => {
    if (!loading && !error && data) {
      setComments(data.getComments);
    }
  }, [loading, error, data]);

  const handleAddComment = async (e) => {
    e.preventDefalut();
    const comment = e.target.elements.comment.value;
    if (!comment) return;

    try {
      const { data } = await addComment({
        variables: { topic: topic._id, comment },
        refetchQueries: [
          { query: GET_COMMENTS, variables: { topic: topic._id } },
        ],
      });

      if (data.addComment) {
        e.target.elements.comment.value = "";
      } else {
        console.error("Failed to add comment");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <Box>
      <Typography variant="h3">{topic.name}</Typography>
      <ul>
        {comments.map((comment) => (
          <li key={comment._id}>
            {comment.user.username}: {comment.comment}
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddComment}>
        <input type="text" name="comment" placeholder="Write a comment" />
        <button type="submit">Add Comment</button>
      </form>
    </Box>
  );
};

export default Topic;
