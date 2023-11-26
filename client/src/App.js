import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";
import Login from "./pages/Login";
import RecuperacionContrasena1 from "./pages/RecuperacionContrasena1";
import RecuperacionContrasena2 from "./pages/RecuperacionContrasena2";
import RecuperacionContrasena3 from "./pages/RecuperacionContrasena3";

import Registro from "./pages/Registro";
import Clientes from "./pages/Clientes";
import ClientesInfo from "./pages/ClientesInfo";
import Repartidores from "./pages/Repartidores";
import RepartidoresInfo from "./pages/RepartidoresInfo";
import ConsultarPedidos from "./pages/ConsultarPedidos";
import Envios from "./pages/Envios";


import HabilitarSolicitud from "./pages/HabilitarSolicitud";
import "./style.scss";
import "./index.css";
import PersonalInfo from "./pages/PersonalInfo";
import Actualiza from "./pages/ActualizacionInfo";
import Home from "./pages/Home";
import AgregarRepartidor from "./pages/AgregarRepartidores";
import EnviosInfo from "./pages/EnviosInfo";
import SolEnvInfo1 from "./pages/SolEnvInfo1";
import SolEnvInfo2 from "./pages/SolEnvInfo2";
import EnviosInfoClientes from "./pages/EnviosInfoClientes";
import SolEnvClientes from "./pages/SolEnvClientes";
import SolEnvClientesInfo from "./pages/SolEnvClientesInfo";
import AgregarSolEnvCliente from "./pages/AgregarSolEnvCliente";
import EnviosAsignados from "./pages/EnviosAsignados"
import EnviosInfoRepartidores from "./pages/EnviosInfoRepartidores";
import ClientesInfoRepartidores from "./pages/ClientesInfoRepartidores";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/AgregarSolEnvCliente",
    element:
      <AgregarSolEnvCliente />,
  },
  {
    path: "/SolEnvInfo1",
    element:
      <SolEnvInfo1 />,
  },
  {
    path: "/SolEnvClientes",
    element:
      <SolEnvClientes />,
  },
  {
    path: "/SolEnvClientesInfo",
    element:
      <SolEnvClientesInfo />,
  },
  {
    path: "/SolEnvInfo2",
    element:
      <SolEnvInfo2 />,
  },
  {
    path: "/AgregarRepartidor",
    element: <AgregarRepartidor />,
  },
  {
    path: "/Actualiza-personal-Info",
    element: <Actualiza />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/Personal-Info",
    element: <PersonalInfo />,
  },
  {
    path: "/Recuperacion-Contrasena1",
    element: <RecuperacionContrasena1 />,
  },
  {
    path: "/Recuperacion-Contrasena2",
    element: <RecuperacionContrasena2 />,
  },
  {
    path: "/Recuperacion-Contrasena3",
    element: <RecuperacionContrasena3 />,
  },
  {
    path: "/Registro",
    element: <Registro />,
  },
  {
    path: "/Clientes",
    element:
      <Clientes />,
  },
  {
    path: "/ClientesInfo",
    element:
      <ClientesInfo />,
  },
  {
    path: "/ClientesInfoRepartidores",
    element:
      <ClientesInfoRepartidores />,
  },
  {
    path: "/EnviosInfo",
    element:
      <EnviosInfo />,
  },
  {
    path: "/EnviosInfoRepartidores",
    element:
      <EnviosInfoRepartidores />,
  },
  {
    path: "/EnviosInfoClientes",
    element:
      <EnviosInfoClientes />,
  },
  {
    path: "/Consultar-Pedidos",
    element:
      <ConsultarPedidos />,

  },
  {
    path: "/Envios",
    element:
      <Envios />,

  },
  {
    path: "/Habilitar-Solicitud",
    element:
      <HabilitarSolicitud />,

  },
  {
    path: "/Repartidores",
    element:
      <Repartidores />
    ,

  },
  {
    path: "/RepartidoresInfo",
    element:
      <RepartidoresInfo />,
  },
  {
    path: "/EnviosAsignados",
    element:
      <EnviosAsignados />,
  },
  {
    path: "/Home",
    element:
      <Home />
    ,

  },
]);

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;

