import { gql, useMutation } from "@apollo/client";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { SIGNUP_MUTATION } from "../../mutations/mutations";
import { Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import LoadingButton from "@mui/lab/LoadingButton";

const formStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
};

const schema = yup
  .object({
    username: yup.string().required("Нэвтрэх нэр оруулна уу"),
    email: yup.string().email().required("Имэйл хаяг оруулна уу"),
    password: yup.string().required("Нууц үг оруулна уу"),
  })
  .required();

const SignUp = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();
  const [signUp, { loading }] = useMutation(SIGNUP_MUTATION);
  const [error, setError] = useState("");

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (d) => {
    console.log(d);
    try {
      const { data, errors } = await signUp({
        variables: {
          input: {
            email: d.email,
            username: d.username,
            schedules: [],
            password: d.password,
          },
        },
      });
      if (data) {
        console.log(data);
        setError("");
        navigate("/login");
      }
      if (errors) {
        setError(errors[0].message);
      }
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
      <FormControl sx={{ display: "flex", gap: "10px", width: "500px" }}>
        <Controller
          name="username"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              color="secondary"
              autoComplete="off"
              autoFocus
              label="Username"
              error={!!errors.username}
              helperText={errors.username?.message}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              color="secondary"
              autoComplete="off"
              label="Email"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              color="secondary"
              autoComplete="off"
              label="Password"
              type="password"
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          )}
        />
        {error && <Box sx={{ color: colors.redAccent[500] }}>{error}</Box>}
        <LoadingButton
          type="submit"
          variant="contained"
          color="secondary"
          loading={loading}>
          БҮРТГҮҮЛЭХ
        </LoadingButton>
        <Divider />
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/login")}>
          НЭВТРЭХ
        </Button>
      </FormControl>
    </form>
  );
};

export default SignUp;
