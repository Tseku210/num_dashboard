import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  useTheme,
} from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import SearchIcon from "@mui/icons-material/Search";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Dialog from "@mui/material/Dialog";

const FriendRequestDialog = (props) => {
  const { open, onClose } = props;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Найзынхаа бүртгэлтэй мэйл хаягыг оруулна уу</DialogTitle>
      <DialogContent>
        <Box display="flex" p="10px" gap="5px" alignItems="center">
          <TextField
            autoFocus
            id="name"
            label="Username"
            type="email"
            fullWidth
            variant="standard"
          />
          <Button variant="contained" sx={{ height: "fit-content" }}>
            Илгээ
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Дуусга</Button>
      </DialogActions>
    </Dialog>
  );
};

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { user, logout } = useAuth();
  const [openFreindRequest, setOpenFreindRequest] = useState(false);

  const handleCloseDialog = () => {
    setOpenFreindRequest(false);
  };

  const handleLogout = () => {
    logout();
  };

  const handleFriendRequest = () => {
    console.log("Friend request sent");
    setOpenFreindRequest(true);
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px">
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>
      <Box display="flex">
        {user ? (
          <>
            <IconButton onClick={handleFriendRequest}>
              <PersonAddOutlinedIcon />
            </IconButton>
            <IconButton onClick={colorMode.toggleColorMode}>
              {theme.palette.mode === "dark" ? (
                <DarkModeOutlinedIcon />
              ) : (
                <LightModeOutlinedIcon />
              )}
            </IconButton>
            <IconButton>
              <NotificationsOutlinedIcon />
            </IconButton>
            <IconButton>
              <SettingsOutlinedIcon />
            </IconButton>
            <IconButton onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton onClick={colorMode.toggleColorMode}>
              {theme.palette.mode === "dark" ? (
                <DarkModeOutlinedIcon />
              ) : (
                <LightModeOutlinedIcon />
              )}
            </IconButton>
            <Link to="/login">
              <IconButton>
                <LoginIcon />
              </IconButton>
            </Link>
          </>
        )}
        {/* when clicked it will route to /login */}
      </Box>
      <FriendRequestDialog
        open={openFreindRequest}
        onClose={handleCloseDialog}
      />
    </Box>
  );
};

export default Topbar;
