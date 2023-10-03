import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login";
import PersonalInfo from "./pages/PersonalInfo";
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
