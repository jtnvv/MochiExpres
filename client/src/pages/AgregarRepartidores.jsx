import Sidebar from "./Sidebar";
import '../style.scss';
import InfoBar from "./InfoBar";
import { validarUsuario } from "../components/validarUsuario.js";
import { getPreguntaSeguridad } from "../components/preguntaSeguridad.js";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import React, { useState, useEffect } from "react";
import logo from '../img/Mochi.jpeg';


const AgregarRepartidores = () => {


    const [inputs, setInputs] = useState({
        idrepartidor: "",
        nombrerepartidor: "",
        correorepartidor: "",
        direccionrepartidor: "",
        telefonorepartidor: "",
        contrasenarepartidor: "",
        identificadorpregrepar: "",
        respuestapregrepar: "",
    });

    const [contrasena, setContrasena] = useState('');

    const [err, setError] = useState(null);


    const { registerRepartidor } = useContext(AuthContext);

    const handleChange = (e) => {
        if (e.target.name === "nombrerepartidor") {
            setContrasena(e.target.value);
        }
       
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setInputs((prev) => ({ ...prev, contrasenarepartidor: contrasena }));
        setInputs((prev) => ({ ...prev, respuestapregrepar: "Por definir" }));


    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(inputs);
        try {
            if (!inputs.idrepartidor || !inputs.nombrerepartidor || !inputs.correorepartidor || !inputs.direccionrepartidor || !inputs.telefonorepartidor || !inputs.contrasenarepartidor || !inputs.identificadorpregrepar || !inputs.respuestapregrepar) {
                setError("Por favor llene todos los campos");
                return;
            }

            if (validarUsuario(inputs.idrepartidor)) {
                const res = await registerRepartidor(inputs);
                alert("Repartidor registrado con éxito");
                window.location.reload();
            } else {
                setError("El identificador debe contener las condiciones necesarias");
                return;
            }


        } catch (err) {
            setError(err.response.data);
        }

    }


    return (
        <div className="content-flex">
            <Sidebar />
            <div className="divContent">

                <InfoBar />
                
                        <div className="ItemsContainer-PersonalInfo">

                            <div className="divBodyPersonalInfo">
                                <div className="divPersonalInfo">
                                    <div className="top">
                                        <h1 className="tittle">¿Cuáles serán los datos del repartidor?</h1>
                                        <ul>
                                            <li>
                                                <div className="p">
                                                    <p className="p-list">Nombre:</p>
                                                    <input type="text" name="nombrerepartidor" placeholder="Nombre Apellido" onChange={handleChange}  />
                                                </div>
                                            </li><br />
                                            <li>
                                                <div className="p">
                                                    <p className="p-list">Correo electrónico:</p>
                                                    <input type="text" name="correorepartidor" placeholder="correo@dominio.com" onChange={handleChange}  />
                                                </div>
                                            </li><br />
                                            <li>
                                                <div className="p">
                                                    <p className="p-list">Número telefónico:</p>
                                                    <input type="text" name="telefonorepartidor" placeholder="0000000000" onChange={handleChange}  />
                                                </div>
                                            </li><br />
                                            <li>
                                                <div className="p">
                                                    <p className="p-list">Dirección:</p>
                                                    <input type="text" name="direccionrepartidor" placeholder="Calle/Av/Cra..." onChange={handleChange}  />
                                                </div>
                                            </li><br />

                                            <li>
                                                <div className="p">
                                                    <p className="p-list">Identificador de usuario:</p>
                                                    <div className="tooltip">
                                                        <input type="text" placeholder="Username123" name="idrepartidor" onChange={handleChange} />
                                                        <div className="p-list-error">

                                                        </div>
                                                        <span className="tooltiptext">Debe ser alfanumérico, no tener espacios, no caracteres especiales y por lo menos una letra minúscula y mayúscula.</span>

                                                    </div>
                                                </div>
                                            </li><br />

                                            <li>
                                                <div className="p">
                                                    <p className="p-list">Contraseña: </p>
                                                    <input type="text" placeholder='' onChange={handleChange} name="contrasenarepartidor" value={contrasena} readOnly/>
                                                </div> </li><br />


                                            <li>
                                                <div className="p">
                                                    <p className="p-list">Pregunta de seguridad: </p>
                                                    <select name="identificadorpregrepar" onChange={handleChange}>
                                                        <option value="0">Escoge una pregunta de seguridad</option>
                                                        <option value="1">{getPreguntaSeguridad(1)}</option>
                                                        {/* <option value="2">{getPreguntaSeguridad(2)}</option>
                                                        <option value="3">{getPreguntaSeguridad(3)}</option> */}
                                                    </select>
                                                    <input type="text" placeholder="Por definir" onChange={handleChange} name="respuestapregrepar" readOnly/>
                                                </div>
                                            </li><br />
                                        </ul>
                                    </div>
                                    <div className="bottomRegister">
                                        <div className="flex">
                                            <div className="div">
                                                <p>En caso de pérdida de contraseña, elige una pregunta de recuperación de contraseña.</p>
                                                {err && <p className="register__bg__error"> {err}</p>}
                                                <button type="submit" onClick={handleSubmit}>Registrar!</button>
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
export default AgregarRepartidores;