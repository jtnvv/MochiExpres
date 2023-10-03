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
                    <span><Link to="/Recuperacion-Contrasena">¿Olvidaste tu contraseña?</Link></span>
                    <button type="submit">Entra!</button>
                    <span><Link to="/Registro">¿No tienes cuenta? Unete</Link></span>
                </form>
            </div>
            <div className="auth__img">
                <img src={people} alt="imagen diseño" className="auth_img_img"/>
            </div>
        </div>
    );
};
export default Login;