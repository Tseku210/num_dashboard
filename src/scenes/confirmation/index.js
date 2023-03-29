import { useParams } from "react-router";
import { CONFIRMATION_MUTATION } from "../../mutations/mutations";
import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Confirmation = () => {
  const [confirmUser] = useMutation(CONFIRMATION_MUTATION);
  const navigate = useNavigate();
  const { userId } = useParams();
  const [error, setError] = useState();

  useEffect(() => {
    confirmUser({
      variables: {
        _id: userId,
      },
    })
      .then((_) => {
        navigate("/login");
      })
      .catch((e) => {
        setError(e.message);
      });
  }, [confirmUser, userId, navigate]);

  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center">
      <Typography variant="h3">
        {!error ? "Баталгаажуулж байна" : "Алдаа гарлаа"}
      </Typography>
    </Box>
  );
};

export default Confirmation;
