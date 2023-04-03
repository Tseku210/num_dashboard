import { ColorModeContext, useMode } from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import Dashboard from "./scenes/dashboard";
import Visualization from "./scenes/visualization";
import Sidebar from "./scenes/global/Sidebar";
import Confirmation from "./scenes/confirmation";
import { Route, Routes } from "react-router-dom";
import "./index.css";
import Login from "./scenes/login";
import SignUp from "./scenes/register";
import PrivateRoutes from "./components/PrivateRoutes";
import { useAuth } from "./hooks/useAuth";
import ScheduleViewer from "./scenes/schedule/scheduleViewer";

function App() {
  const [theme, colorMode] = useMode();

  const { user } = useAuth();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {user ? <Sidebar /> : null}
          <main className="content">
            {user ? <Topbar /> : null}
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/confirmation/:userId" element={<Confirmation />} />
              <Route path="/" element={<PrivateRoutes />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/visualization" element={<Visualization />} />
                <Route path="/schedule" element={<ScheduleViewer />} />
              </Route>
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
