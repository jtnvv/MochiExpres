import React, { useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { useContext, useState } from "react";
import { FaSearch } from "react-icons/fa";
const ModuloAuditoriaIngresos = (props) => {

    const { getClienteSol } = useContext(AuthContext);
    const { getRepartidor } = useContext(AuthContext);

    const [nombreCliente, setNombreCliente] = useState("");
    const [nombreRepartidor, setNombreRepartidor] = useState("");
    const [modalStyle, setModalStyle] = useState({});
    const [clickedModal, setClickedModal] = useState(false);
    
    const showModal = () => {
        if (!clickedModal) {
            setModalStyle({ visibility: 'visible' });
        } else {
            setModalStyle({ visibility: 'hidden' });
        }
        setClickedModal(!clickedModal);
    };

    
    useEffect(() => {
        const obtenerCliente = async () => {
            try {
                console.log(props.idsolicitudenvio);
                const res = await getClienteSol(props.idsolicitudenvio);
                setNombreCliente(res.nombrecliente);
                console.log(res.nombrecliente);
            } catch (err) {
                console.log(err);
            }
        };
        obtenerCliente();
    }, [nombreCliente]);

    useEffect(() => {
        const obtenerRepartidor = async () => {
            try {
                if (props.idrepartidor !== null) {
                    const res = await getRepartidor(props.idrepartidor);
                    setNombreRepartidor(res.nombrerepartidor);
                    console.log("nombre del repa: ", res.nombrerepartidor);
                }else{
                    setNombreRepartidor("No asignado");
                }

            } catch (err) {
                console.log(err);
            }
        };
        obtenerRepartidor();
    }, [nombreRepartidor]);

    return (
        <div className="moduloAuditoria2" >
            <h3 className="text_i">{props.idaud}</h3>
            <h3 className="text">{props.tipo}</h3>
            <h3 className="text">{props.usuario}</h3>
            <h3 className="text">{props.accion}</h3>
            <button className="text" onClick={()=>showModal()}><FaSearch className="IconColor"/></button>
            <h3 className="text">{props.resultado}</h3>
            <h3 className="text_d">{props.fecha}</h3>

            <div className="modalDetalleContenedor" style={modalStyle}>
                <div className="containerModalEliminarRepartidor2">
                <div className="eliminarModalDetalle" onClick={() => showModal()}>X</div>
                    <div className="modalEliminarDetalle">
                        <h3>Detalle</h3>
                        <p>{props.detalle}</p>
                    </div>
                </div>
            </div>
        </div>
        
    );
};
export default ModuloAuditoriaIngresos;