import React, { useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { useContext, useState } from "react";
import { FaSearch } from "react-icons/fa";

const ModuloAuditoria = (props) => {

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

    return (
        <div className="moduloAuditoria" >
            <h3 className="text_i">{props.aud_id}</h3>
            <h3 className="text">{props.aud_tipousuario}</h3>
            <h3 className="text">{props.aud_idusuario}</h3>
            <h3 className="text">{props.aud_nombreusuario}</h3>
            <h3 className="text">{props.aud_accion}</h3>
            <h3 className="text">{props.aud_archivo}</h3>
            <h3 className="text">{props.aud_idobjeto}</h3>
            <button className="text" onClick={()=>showModal()}><FaSearch className="IconColor"/></button>
            <h3 className="text">{props.aud_resultado}</h3>
            <h3 className="text_d">{props.aud_fecha}</h3>
            <div className="modalDetalleContenedor" style={modalStyle}>
                <div className="containerModalEliminarRepartidor2">
                <div className="eliminarModalDetalle" onClick={() => showModal()}>X</div>
                    <div className="modalEliminarDetalle">
                        <h3>Detalle</h3>
                        <p>{props.aud_detalle}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ModuloAuditoria;