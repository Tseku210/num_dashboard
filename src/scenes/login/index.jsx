import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import { LOGIN_MUTATION } from "../../mutations/mutations";
import { useMutation } from "@apollo/client";
import { Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import backgroundImage from "../../assets/index.png";
import Typography from "@mui/material/Typography";

const formStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "80%",
};

const schema = yup
  .object({
    email: yup.string().email().required("Нэвтрэх имэйл оруулна уу"),
    password: yup.string().required("Нууц үг оруулна уу"),
  })
  .required();

const Login = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [logIn, { loading }] = useMutation(LOGIN_MUTATION);
  const { login } = useAuth();
  const [error, setError] = useState("");

  if (loading) {
    console.log("loading");
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (d) => {
    console.log(d);
    try {
      const { data } = await logIn({
        variables: {
          email: d.email,
          password: d.password,
        },
      });
      console.log(data);

      login(data.login);

      setError("");
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
        <Typography variant="h1" mb="20px" sx={{ textAlign: "center" }}>
          Тавтай морил
        </Typography>
        <FormControl sx={{ display: "flex", gap: "10px", width: "500px" }}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                color="secondary"
                autoComplete="off"
                autoFocus
                label="Имэйл"
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
                label="Нууц үг"
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
            НЭВТРЭХ
          </LoadingButton>
          <Divider />
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/register")}>
            БҮРТГҮҮЛЭХ
          </Button>
        </FormControl>
      </form>
      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "50%",
          backgroundImage: `url(${backgroundImage})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left",
          backgroundSize: "cover",
        }}></Box> */}
    </>
  );
};

export default Login;
