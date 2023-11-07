import React from "react";
import Sidebar from "./Sidebar";
import * as IoIcons from "react-icons/io5";
import { Link } from "react-router-dom";
import { getPreguntaSeguridad } from "../components/preguntaSeguridad.js";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Actualiza = () => {

    const { currentUser, setCurrentUser } = useContext(AuthContext);
    const { currentNew, setCurrentNew } = useContext(AuthContext);
    const [shouldNavigate, setShouldNavigate] = useState(false);

    const [inputs, setInputs] = useState({
        idusuario: currentUser?.idusuario,
        nombreusuario: currentUser?.nombreusuario,
        correousuario: currentUser?.correousuario,
        direccionusuario: currentUser?.direccionusuario,
        telefonousuario: currentUser?.telefonousuario,
        identificadorpregusuario: currentUser?.identificadorpregusuario,
        respuestapregusuario: currentUser?.respuestapregusuario,
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
                <div className="ItemsContainer-PersonalInfo">
                    <div className="divHeaderPersonalInfo">
                        <Link to="/Personal-Info" className="divVolverInfoBar">
                            <IoIcons.IoCaretBackOutline className="IoIconsPersonalInfo" /> Volver</Link>

                        <p className="photo">{currentUser?.nombreusuario}<img src="https://i.pinimg.com/736x/b4/f0/c1/b4f0c18411053da3aa6df7d115ac2e62--siamese-cats-kitty-cats.jpg" alt="" /></p>

                    </div>
                    <div className="divBodyPersonalInfo">
                        <div className="divLeftPersonalInfo">
                            <img className="imgLeftPersonalInfo" src="https://i.pinimg.com/736x/b4/f0/c1/b4f0c18411053da3aa6df7d115ac2e62--siamese-cats-kitty-cats.jpg" alt="" />
                            <h2 className="usernameTxt">{currentUser?.nombreusuario}</h2>
                            <input type="text" placeholder="Nuevo nombre" onChange={handleChange} name="nombreusuario" />
                            <h2 className="rolTxt">"Rol: {currentUser?.tipousuario}"</h2>
                        </div>
                        <div className="divRightPersonalInfo">
                            <div className="top">
                                <h1 className="tittle">Tus datos personales</h1>
                                <ul>
                                    <li>
                                        <div className="p">
                                            <p className="p-list">Número telefónico:</p>
                                            <input type="text" placeholder={currentUser?.telefonousuario} onChange={handleChange} name="telefonousuario" />
                                        </div>
                                    </li><br />
                                    <li>
                                        <div className="p">
                                            <p className="p-list">Dirección: </p>
                                            <input type="text" placeholder={currentUser?.direccionusuario} onChange={handleChange} name="direccionusuario" />
                                        </div>
                                    </li><br />
                                    <li>
                                        <div className="p">
                                            <p className="p-list">Correo electrónico:</p>
                                            <input type="text" placeholder={currentUser?.correousuario} onChange={handleChange} name="correousuario" />
                                        </div>
                                    </li><br />
                                    <li>
                                        <div className="p">
                                            <p className="p-list">Número identidad:</p>
                                            <p className="content" name="idusuario">{currentUser?.idusuario}</p>
                                        </div>
                                    </li><br />
                                    <li>
                                        <div className="p">
                                            <p className="p-list">Pregunta de seguridad: </p>
                                            <select name="identificadorpregusuario" onChange={handleChange}>
                                                <option value={currentUser?.identificadorpregusuario}>{getPreguntaSeguridad(currentUser?.identificadorpregusuario)}</option>
                                                <option value="1">{getPreguntaSeguridad(1)}</option>
                                                <option value="2">{getPreguntaSeguridad(2)}</option>
                                                <option value="3">{getPreguntaSeguridad(3)}</option>
                                            </select>
                                            <input type="text" placeholder={currentUser?.respuestapregusuario} onChange={handleChange} name="respuestapregusuario" />
                                        </div>
                                    </li><br />
                                </ul>
                            </div>
                            <div className="bottomRegister">
                                <div className="flex">
                                    <div className="div">
                                        <p>¿Finalizaste tus cambios?.</p>
                                        <button type="submit" onClick={handleSubmit}>Actualizar!</button>
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
export default Actualiza;