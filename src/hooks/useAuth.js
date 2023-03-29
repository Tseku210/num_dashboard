import { AuthContext } from "../utils/context/authContext";
import { useContext } from "react";

export const useAuth = () => useContext(AuthContext);
