import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Login from "./pages/Login";
import Navbar from "./pages/Navbar";
import Sidebar from "./pages/Sidebar";
import RecuperacionContrasena1 from "./pages/RecuperacionContrasena1";
import RecuperacionContrasena2 from "./pages/RecuperacionContrasena2";
import RecuperacionContrasena3 from "./pages/RecuperacionContrasena3";
import Registro from "./pages/Registro";
import Clientes from "./pages/Clientes";
import Repartidores from "./pages/Repartidores";
import ConsultarPedidos from "./pages/ConsultarPedidos";
import Envios from "./pages/Envios";
import HabilitarSolicitud from "./pages/HabilitarSolicitud";
import "./style.scss";
const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello!</div>,
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/Personal-Info",
    element: 
      <>
        <Navbar />,
        <Sidebar />
      </>
    ,
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
    <> 
      <Navbar />,
      <div className="flex">
        <Sidebar />
        <div className="content">
          <Routes path="/Clientes" exact={true} Component={Clientes}/>
        </div>
      </div>
    </>,
    
  },
  {
    path: "/Consultar-Pedidos",
    element: 
    <> 
      <Navbar />,
      <Sidebar />,
      <ConsultarPedidos />
    </>,
    
  },
  {
    path: "/Envios",
    element: 
    <> 
      <Navbar />,
      <Sidebar />,
      <Envios />
    </>,
    
  },
  {
    path: "/Habilitar-Solicitud",
    element: 
    <> 
      <Navbar />,
      <Sidebar />,
      <HabilitarSolicitud />
    </>,
    
  },
  {
    path: "/Repartidores",
    element: 
    <> 
      <Navbar />,
      <Sidebar />,
      <Repartidores />
    </>,
    
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
