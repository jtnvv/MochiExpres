import React from "react";
import Sidebar from "./Sidebar";
import InfoBar from "./InfoBar";
import * as IoIcons from "react-icons/io5";
import { Link } from "react-router-dom";
import { getPreguntaSeguridad } from "../components/preguntaSeguridad.js";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AgregarRepartidores = () => {

    const { currentUser, setCurrentUser } = useContext(AuthContext);
    const { currentNew, setCurrentNew } = useContext(AuthContext);
    const [shouldNavigate, setShouldNavigate] = useState(false);

    const [inputs, setInputs] = useState({
        idrepartidor: currentUser?.idrepartidor,
        nombrerepartidor: currentUser?.nombrerepartidor,
        correorepartidor: currentUser?.correorepartidor,
        conrtasenarepartidor: currentUser?.conrtasenarepartidor,
        contrasena2repartidor: currentUser?.contrasena2repartidor,
        telefonorepartidor: currentUser?.telefonorepartidor,

        identificadorpregrepartidor: currentUser?.identificadorpregrepartidor,

        respuestapregrepartidor: currentUser?.respuestapregrepartidor,
    });

    const [err, setError] = useState(null);

    const navigate = useNavigate();

    const { update, getinfouser } = useContext(AuthContext);

    const handleChange = (e) => {

        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(inputs);
        try {
            await update(inputs);

            // await getinfouser(inputs);
            console.log("Haz actualizado correctamente get");
            await getinfouser(inputs);
            setShouldNavigate(true);


            //setCurrentUser(res2.data[0]);

        } catch (err) {
            setError(err.response.data);
        }

    }

    useEffect(() => {
        if (shouldNavigate) {
            navigate("/Personal-Info");
        }
    }, [shouldNavigate]);

    return (
        <div className="content-flex">
            <Sidebar />
            <div className="divContent">

                <InfoBar />
                <div className="ItemsContainer">
                    <div className="divContent">
                        <div className="ItemsContainer-PersonalInfo">

                            <div className="divBodyPersonalInfo">
                                <div className="divPersonalInfo">
                                    <div className="top">
                                        <h1 className="tittle">¿Cuáles serán los datos del repartidor?</h1>
                                        <ul>
                                            <li>
                                                <div className="p">
                                                    <p className="p-list">Nombre:</p>
                                                    <input type="text" placeholder={currentUser?.nombrerepartidor} onChange={handleChange} name="nombrerepartidor" />
                                                </div>
                                            </li><br />
                                            <li>
                                                <div className="p">
                                                    <p className="p-list">Correo electrónico:</p>
                                                    <input type="text" placeholder={currentUser?.correorepartidor} onChange={handleChange} name="correorepartidor" />
                                                </div>
                                            </li><br />
                                            <li>
                                                <div className="p">
                                                    <p className="p-list">Número telefónico:</p>
                                                    <input type="text" placeholder={currentUser?.telefonorepartidor} onChange={handleChange} name="telefonorepartidor" />
                                                </div>
                                            </li><br />

                                            <li>
                                                <div className="p">
                                                    <p className="p-list">Identificador de usuario:</p>
                                                    <input type="text" placeholder={currentUser?.idrepartidor} onChange={handleChange} name="idrepartidor" />
                                                </div>
                                            </li><br />

                                            <li>
                                                <div className="p">
                                                    <p className="p-list">Contraseña: </p>
                                                    <input type="text" placeholder={currentUser?.contrasenarepartidor} onChange={handleChange} name="contrasenarepartidor" />
                                                </div> </li><br />
                                            <li>
                                                <div className="p">
                                                    <p className="p-list">Confirmar contraseña: </p>
                                                    <input type="text" placeholder={currentUser?.contrasena2repartidor} onChange={handleChange} name="contrasena2repartidor" />
                                                </div>
                                            </li><br />

                                            <li>
                                                <div className="p">
                                                    <p className="p-list">Pregunta de seguridad: </p>
                                                    <select name="identificadorpregrepartidor" onChange={handleChange}>
                                                        <option value={currentUser?.identificadorpregrepartidor}>{getPreguntaSeguridad(currentUser?.identificadorpregrepartidor)}</option>
                                                        <option value="1">{getPreguntaSeguridad(1)}</option>
                                                        <option value="2">{getPreguntaSeguridad(2)}</option>
                                                        <option value="3">{getPreguntaSeguridad(3)}</option>
                                                    </select>
                                                    <input type="text" placeholder={currentUser?.respuestapregrepartidor} onChange={handleChange} name="respuestapregrepartidor" />
                                                </div>
                                            </li><br />
                                        </ul>
                                    </div>
                                    <div className="bottomRegister">
                                        <div className="flex">
                                            <div className="div">
                                                <p>En caso de pérdida de contraseña, elige una pregunta de recuperación de contraseña.</p>
                                                <button type="submit" onClick={handleSubmit}>Registrar!</button>
                                            </div>

                                        </div>
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