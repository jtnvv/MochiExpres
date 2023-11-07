import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();


export const AuthContexProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [currentTypeUser, setCurrentTypeUser] = useState(
    JSON.parse(localStorage.getItem("typeuser")) || null
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
    setCurrentTypeUser(res.data.tipousuario);
  };

  const logout = async (inputs) => {
    await axios.post("/auth/logout");
    setCurrentUser(null);
    setCurrentTypeUser(null);
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

  const registrarCliente = async (inputs) => {
    const res = await axios.post("/auth/register", inputs);
    console.log(res.data);
  }

  const getRepartidores = async () => {
    const res = await axios.get("/repartidores/getRepartidores");

    //console.log("Aqui empiexaaaa");
    //console.log(res.data);
    return res.data;
  }

  const registerRepartidor = async (inputs) => {
    const res = await axios.post("/repartidores/register", inputs);
    console.log(res.data);
  }

  const getRepartidor = async (idrepartidor) => {
    const res = await axios.get(`/repartidores/getRepartidor/${idrepartidor}`);
    return res.data;
  }

  const deleteRepartidor = async (idRepartidor) => {
    const res = await axios.delete(`/repartidores/deleteRepartidor/${idRepartidor}`, idRepartidor);
    //console.log("Aqui empiexaaaa");
    console.log(res.data);
  }

  const getClientes = async () => {
    const res = await axios.get("/clientes/getClientes");
    return res.data;
  }

  const getCliente = async (idCliente) => {
    const res = await axios.get(`/clientes/getCliente/${idCliente}`);
    return res.data;
  }

  const getClienteSol = async (idsolicitud) => {
    const res = await axios.get(`/clientes/getClienteSol/${idsolicitud}`);
    return res.data;
  }

  const deleteCliente = async (idCliente) => {
    const res = await axios.delete(`/clientes/deleteCliente/${idCliente}`);
    //console.log("Aqui empiexaaaa");
    console.log(res.data);
  }

  const getEnvios = async () => {
    const res = await axios.get("/envios/getEnvios");
    return res.data;
  }

  const getEnviosCliente = async (idCliente) => {
    const res = await axios.get(`/envios/getEnviosCliente/${idCliente}`);
    return res.data;
  }

  const deleteEnviosCliente = async (idCliente) => {
    const res = await axios.delete(`/envios/deleteEnviosCliente/${idCliente}`);
    //console.log("Aqui empiexaaaa");
    console.log(res.data);
  }

  const updateEnvioEstado = async (inputs) => {
    const res = await axios.post("/envios/updateEnvioEstado", inputs);
    console.log(res.data);
  };

  const updateEnvioRepartidor = async (inputs) => {
    const res = await axios.post("/envios/updateEnvioRepartidor", inputs);
    console.log(res.data);
  }

  const getSolicitudesEnvio = async () => {
    const res = await axios.get("/solicitudesenvio/getSolicitudesEnvio");
    return res.data;
  }

  const deleteSolicitudesCliente = async (idCliente) => {
    const res = await axios.delete(`/solicitudesenvio/deleteSolicitudesCliente/${idCliente}`);
    //console.log("Aqui empiexaaaa");
    console.log(res.data);
  }
  const getSolicitudId = async (idsolicitudenvio) => {
    const res = await axios.get(`/solicitudesenvio/getSolicitudId/${idsolicitudenvio}`);
    return res.data;
  }

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("typeuser", JSON.stringify(currentTypeUser));
  }, [currentTypeUser]);

  useEffect(() => {
    localStorage.setItem("in", JSON.stringify(currentIn));
  }, [currentIn]);

  useEffect(() => {
    localStorage.setItem("in", JSON.stringify(currentNew));
  }, [currentNew]);

  return (
    <AuthContext.Provider value={{ currentUser, currentTypeUser, login, logout, auth_recov1, auth_recov2, auth_recov3, getinfouser, currentIn, currentNew, update, updatepass, checkpass, getRepartidores, getClientes, deleteRepartidor, deleteCliente, deleteSolicitudesCliente, deleteEnviosCliente, getSolicitudesEnvio, getEnviosCliente, getEnvios, getRepartidor, getCliente, getClienteSol, updateEnvioEstado, updateEnvioRepartidor, getSolicitudId }}>
      {children}
    </AuthContext.Provider>
  );

};

