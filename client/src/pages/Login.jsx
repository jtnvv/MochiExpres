import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import people from "../img/login-people.png";
const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    function verificacionCampos(event) //verifica si ambos campos estan llenos
    {
        event.preventDefault();
        if (username === "" || password === "") {
            setErrorMessage("Por favor, llena ambos campos");
        }
        else {
            //continuar con el proceso de login
        }
    }
    return (
        <div className="auth">
            <div className="auth__bg">
                <h1>¡Bienvenido!</h1>
                <form onSubmit={verificacionCampos}>
                    <input type="text" id="username" name="username" placeholder="Username" value={username} onChange={(event) => setUsername(event.target.value)} />
                    <input type="password" id="password" name="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
                    {errorMessage && <p className="auth__bg__error">{errorMessage}</p>}
                    <Link className="auth__bg__text" to="/Recuperacion-Contrasena">¿Olvidaste tu contraseña?</Link>
                    <button type="submit">Entra!</button>
                    <Link className="auth__bg__text" to="/Registro">¿No tienes cuenta? Únete</Link>
                </form>
            </div>
            <div className="auth__img">
                <img src={people} alt="imagen diseño" className="auth_img_img" />
            </div>
        </div>
    );
};
export default Login;