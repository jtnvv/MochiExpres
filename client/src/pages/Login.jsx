import React, { useState, useEffect } from "react";
import people from "../img/login-people.png";
//import axios from "axios";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/authContext.js';

const Login = () => {
    const [inputs, setInputs] = useState({
        idusuario: "",
        contrasenausuario: "",
    });

    const [err, setError] = useState(null);
    const [shouldNavigate, setShouldNavigate] = useState(false);

    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

    //console.log(currentUser);

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputs.idusuario || !inputs.contrasenausuario) {
            setError("Por favor, completa todos los campos");
        } else {
            try {
                //await axios.post("/auth/login", inputs);
                await login(inputs);
                setShouldNavigate(true);
            } catch (err) {
                setError(err.response.data);
            }
        }
    };

    useEffect(() => {
        if (shouldNavigate) {
            navigate("/Home");
        }
    }, [shouldNavigate]);

    return (
        <div className="auth">
            <div className="auth__bg">
                <h1>¡Bienvenido!</h1>
                <form>
                    <input
                        required
                        type="text"
                        placeholder="Username"
                        name="idusuario"
                        onChange={handleChange}
                    />
                    <input
                        required
                        type="password"
                        placeholder="Password"
                        name="contrasenausuario"
                        onChange={handleChange}
                    />
                    {err && <p className="auth__bg__error">{err}</p>}
                    <Link className="auth__bg__text" to="/Recuperacion-Contrasena1">¿Olvidaste tu contraseña?</Link>
                    <button
                        type="submit"
                        onClick={handleSubmit}
                    >Entra!</button>
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