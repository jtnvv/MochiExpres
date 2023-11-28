import Sidebar from "./Sidebar";
import '../style.scss';
import InfoBar from "./InfoBar";
import { calcularTarifa } from "../components/calcularTarifa.js";
import { generarIdSolicitudEnvio } from "../components/generarIdSolicitudEnvio.js";
import { retornarFecha } from "../components/retornarFecha.js";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import logo from '../img/Mochi.jpeg';
import React, { useState, useEffect } from "react";


const AgregarSolEnvCliente = () => {
    const [pesopaqueteList, setPesoPaqueteList] = useState('');
    const { currentUser } = useContext(AuthContext);
    const [inputs, setInputs] = useState({
        idsolicitudenvio: generarIdSolicitudEnvio(),
        descripcionsolicitud: "",
        pesopaquete: "",
        tarifasolicitud: "",
        fechasolicitud: retornarFecha(Date.now()),
        destinosolicitud: "",
        idCliente: currentUser.idusuario,
    });

    const [err, setError] = useState(null);


    const { createSolEnvio } = useContext(AuthContext);

    const handleChange = (e) => {
        setInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
            tarifasolicitud: e.target.name === 'pesopaquete' ? parseFloat(e.target.value) * 8000 : prev.tarifasolicitud
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(inputs);
        try {
            if (!inputs.descripcionsolicitud || !inputs.pesopaquete || !inputs.destinosolicitud) {
                setError("Por favor llene todos los campos");
                return;
            } else {
                const res = await createSolEnvio(inputs);
                alert("Solicitud registrada con éxito");
            }
            console.log(inputs);
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
                            <div className="top-solenvcliente">
                                <h1 className="tittle">Crea tu solicitud</h1>
                                <ul>
                                    <li>
                                        <div className="p">
                                            <p className="p-list">Peso del paquete:</p>
                                            <input type="text" name="pesopaquete" placeholder="xx kg" onChange={handleChange} />
                                        </div>
                                    </li><br />
                                    <li>
                                        <div className="p">
                                            <p className="p-list">Danos una breve descripcion de tu paquete:</p>
                                            <input type="text" name="descripcionsolicitud" placeholder="Descripcion de tu pedido" onChange={handleChange} />
                                        </div>
                                    </li><br />
                                    <li>
                                        <div className="p">
                                            <p className="p-list">Destino de tu pedido:</p>
                                            <input type="text" name="destinosolicitud" placeholder="Cra xx # xx- xx" onChange={handleChange} />
                                        </div>
                                    </li><br />
                                </ul>
                            </div>
                            <div className="bottomRegister">
                                <div className="flex">
                                    <div className="div">
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
export default AgregarSolEnvCliente;