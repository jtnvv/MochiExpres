import React, { useState, useEffect } from "react";
import people from "../img/login-people.png";
//import axios from "axios";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/authContext.js';

const Login = () => {
    const [divStyle, setDivStyle] = useState({});
    const [clicked, setClicked] = useState(false);
    const [modalStyle, setModalStyle] = useState({});
    const [clickedModal, setClickedModal] = useState(false);

    const showModal = (idCliente) => {
        if (!clickedModal) {
            setModalStyle({ visibility: 'visible' });
        } else {
            setModalStyle({ visibility: 'hidden' });
        }
        setClickedModal(!clickedModal);
    };



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
                        placeholder="Usuario"
                        name="idusuario"
                        onChange={handleChange}
                    />
                    <input
                        required
                        type="password"
                        placeholder="Contraseña"
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
                    <Link className="auth__bg__text" onClick={() => showModal()}>Tratamiento de datos personales</Link>
                </form>
            </div>
            <div className="auth__img">
                <img src={people} alt="imagen diseño" className="auth_img_img" />

            </div>

            <div className="modalConsultarContenedor" style={modalStyle}>
                <div className="containerModalEliminarRepartidor2">
                    <div className="eliminarModalRepartidor" onClick={() => showModal()}>X</div>
                    <div className="modalConsultarPedido">
                        <h3>Tratamiento de datos</h3>
                        <p>Al ingresar en la aplicacion autorizo de manera voluntaria, previa, expresa e informada a Mochi Express para tratar mi información personal, de acuerdo con lo dispuesto en la Ley 1581 de 2012,asimismo las finalidades descritas en la política de tratamiento de datos personales, las cuales están relacionadas con Mercadeo, Administrativas y Frente a Terceros disponibles para consulta <a href="https://www.sic.gov.co/sites/default/files/documentos/072020/Pol%C3%ADtica%20de%20Tratamiento%20de%20Datos%20Personales%20-%20SIC.pdf"> AQUI </a>

                            Recuerde que, si desea conocer, actualizar, rectificar, suprimir datos personales o revocar la autorización al uso de los mismos, puede escribir a <a href="mailto:jonathan.jnthnd@gmail.com">Enviar correo</a> para realizar la solicitud.
                        </p>

                    </div>
                </div>
            </div>
        </div>


    );
};
export default Login;