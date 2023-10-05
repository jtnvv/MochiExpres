import React from "react";
import { Link } from "react-router-dom";
import people from "../img/login-people.png";
const Login = () => {
    return (
        <div className="auth">
            <div className="auth__bg">
                <h1>¡Bienvenido!</h1>
                <form>
                    <input type="text" placeholder="Username" />
                    <input type="password" placeholder="Password" />
                    <p className="auth__bg__error">Esto es un error</p>
                    <Link className="auth__bg__text" to="/Recuperacion-Contrasena1">¿Olvidaste tu contraseña?</Link>
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