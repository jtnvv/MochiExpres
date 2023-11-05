import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as IoIcons from "react-icons/io5";
import { getPreguntaSeguridad } from "../components/preguntaSeguridad.js";
import { validarUsuario } from "../components/validarUsuario.js";
import axios from "axios";

const Registro = () => {

    const [shouldNavigate, setShouldNavigate] = useState(false);
    const [inputs, setInputs] = useState({
        idCliente: "",
        nombrecliente: "",
        correocliente: "",
        direccioncliente: "",
        telefonocliente: "",
        contrasenacliente: "",
        identificadorpregcliente: "",
        respuestapregcliente: "",
    });

    const [err, setError] = useState(null);

    const navigate = useNavigate();

    const handleChange = (e) => {

        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(inputs);
        try {
            if(!inputs.idCliente || !inputs.nombrecliente || !inputs.correocliente || !inputs.direccioncliente || !inputs.telefonocliente || !inputs.contrasenacliente || !inputs.identificadorpregcliente || !inputs.respuestapregcliente){
                setError("Por favor llene todos los campos");
                return;
            }
            if (validarUsuario(inputs.idCliente)) {
                const res = await axios.post("/auth/register", inputs);
                console.log("Ha salido bien :D ", res);
                setShouldNavigate(true);
            } else {
                setError("El identificador debe contener las condiciones necesarias");
                return;
            }
        } catch (err) {
            setError(err.response.data);
        }

    };

    useEffect(() => {
        if (shouldNavigate) {
            navigate("/login");
        }
    }, [shouldNavigate]);



    return (
        <div className="content-flex">
            <div className="divContent">
                <div className="ItemsContainer-PersonalInfo">
                    <div className="divHeaderPersonalInfo">
                        <p><i><IoIcons.IoCaretBackOutline className="IoIconsPersonalInfo" /></i> Volver</p>


                    </div>
                    <div className="divBodyPersonalInfo">
                        <div className="divLeftPersonalInfo">
                            <img className="imgLeftPersonalInfo" src="https://i.imgur.com/T9X0JHm.jpg" alt="" />
                            <h2 className="usernameTxt">Nombre de Usuario</h2>
                            <input required type="text" placeholder="Nuevo nombre" name="nombrecliente" onChange={handleChange} />
                            <h2 className="rolTxt">Cliente</h2>
                        </div>
                        <div className="divRightPersonalInfo">
                            <div className="top">
                                <h1 className="tittle">Tus datos personales</h1>
                                <ul>
                                    <li>
                                        <div className="p">
                                            <p className="p-list">Identificador de usuario: </p>
                                            <div className="tooltip">
                                                <input type="text" placeholder="Username123" name="idCliente" onChange={handleChange} />
                                                <div className="p-list-error">
                                                
                                            </div>
                                                <span className="tooltiptext">Debe ser alfanumérico, no tener espacios, no caracteres especiales y por lo menos una letra minúscula y mayúscula.</span>

                                            </div>
                                            
                                        </div>
                                    </li><br />
                                    <li>
                                        <div className="p">
                                            <p className="p-list">Número telefónico: </p>
                                            <input type="text" placeholder="+57 ( 321 ) - 747 5876." name="telefonocliente" onChange={handleChange} />
                                        </div>
                                    </li><br />
                                    <li>
                                        <div className="p">
                                            <p className="p-list">Dirección: </p>
                                            <input type="text" placeholder="Calle/Avenida/Carrera ..." name="direccioncliente" onChange={handleChange} />
                                        </div>
                                    </li><br />
                                    <li>
                                        <div className="p">
                                            <p className="p-list">Correo electrónico: </p>
                                            <input type="text" placeholder="NombreU @ correo.ext" name="correocliente" onChange={handleChange} />
                                        </div>
                                    </li><br />
                                    <li>
                                        <div className="p">
                                            <p className="p-list">Contraseña: </p>
                                            <input type="password" placeholder="Contraseña" name="contrasenacliente" onChange={handleChange} />
                                        </div>
                                    </li><br />

                                    <li>
                                        <div className="p">
                                            <p className="p-list">Pregunta de seguridad: </p>
                                            <select name="identificadorpregcliente" onChange={handleChange}>
                                                <option value="0">{getPreguntaSeguridad(0)}</option>
                                                <option value="1">{getPreguntaSeguridad(1)}</option>
                                                <option value="2">{getPreguntaSeguridad(2)}</option>
                                                <option value="3">{getPreguntaSeguridad(3)}</option>
                                            </select>
                                        </div>

                                        <div className="p">
                                            <input type="text" placeholder="Respuesta pregunta" name="respuestapregcliente" onChange={handleChange} />
                                        </div>


                                    </li><br />
                                </ul>
                            </div>
                            <div className="bottomRegister">
                                <div className="flex">
                                    <div className="div">
                                        <p>¿Todo listo?.</p>
                                        {err && <p className="register__bg__error"> {err}</p>}
                                        <button onClick={handleSubmit} type="submit">Registrarse!</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Registro;