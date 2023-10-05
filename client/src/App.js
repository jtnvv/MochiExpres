import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login";
import PersonalInfo from "./pages/PersonalInfo";
import RecuperacionContrasena1 from "./pages/RecuperacionContrasena1";
import RecuperacionContrasena2 from "./pages/RecuperacionContrasena2";
import RecuperacionContrasena3 from "./pages/RecuperacionContrasena3";
import Registro from "./pages/Registro";
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
