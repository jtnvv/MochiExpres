import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login";
import PersonalInfo from "./pages/PersonalInfo";
import RecuperacionContrasena from "./pages/RecuperacionContrasena";
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
    path: "/Recuperacion-Contrasena",
    element: <RecuperacionContrasena />,
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
