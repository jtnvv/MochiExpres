import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [currentIn, setCurrentIn] = useState(
    JSON.parse(localStorage.getItem("in")) || null
  );


  const login = async (inputs) => {
    const res = await axios.post("/auth/login", inputs);
    setCurrentUser(res.data);
  };

  const logout = async (inputs) => {
    await axios.post("/auth/logout");
    setCurrentUser(null);
  };

  const auth_recov1 = async (inputs) => {
    const res = await axios.post("/auth_pass/auth_recov1", inputs);
    console.log(res.data);
    setCurrentIn(res.data);
  };

  const auth_recov2 = async (inputs) => {
    const res = await axios.post("/auth_pass/auth_recov2", inputs);
    console.log(res.data);
    setCurrentIn(res.data);
  };

  const auth_recov3 = async (inputs) => {
    const res = await axios.post("/auth_pass/auth_recov3", inputs);
    console.log(res.data);
    setCurrentIn("");
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("in", JSON.stringify(currentIn));
  }, [currentIn]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, auth_recov1,auth_recov2,auth_recov3,  currentIn }}>
      {children}
    </AuthContext.Provider>
  );
};

