import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export let repartidores = [];

export const AuthContexProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [currentIn, setCurrentIn] = useState(
    JSON.parse(localStorage.getItem("in")) || null
  );

  const [currentNew, setCurrentNew] = useState(
    JSON.parse(localStorage.getItem("new")) || null
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

  const update = async (inputs) => {
    const res = await axios.post("/usuarios/update", inputs);
    //console.log(res.data);
    setCurrentUser("");
    // const res2 = await axios.post("/usuarios/getuser", inputs);
    // setCurrentUser(res2.data);

  };

  const getinfouser = async (inputs) => {
    const res = await axios.post("/usuarios/getuser", inputs);
    //console.log(res.data);
    setCurrentUser(res.data);
  }

  const updatepass = async (inputs) => {
    const res = await axios.post("/usuarios/updatepass", inputs);
    //console.log(res.data);
    setCurrentUser("");
  }

  const checkpass = async (inputs) => {
    const res = await axios.post("/usuarios/checkpass", inputs);
    //console.log(res.data);
    return res.data;
  }

  const getRepartidores = async () => {
    const res = await axios.get("/repartidores/getRepartidores");
    // repartidores.push(res.data);
    // console.log(repartidores);

    console.log("Aqui empiexaaaa");
    console.log(res.data);
    return res.data;
  }

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("in", JSON.stringify(currentIn));
  }, [currentIn]);

  useEffect(() => {
    localStorage.setItem("in", JSON.stringify(currentNew));
  }, [currentNew]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, auth_recov1, auth_recov2, auth_recov3, getinfouser, currentIn, currentNew, update, updatepass, checkpass, getRepartidores }}>
      {children}
    </AuthContext.Provider>
  );
};

