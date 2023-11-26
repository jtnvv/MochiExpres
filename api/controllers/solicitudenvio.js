import { db } from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const getSolicitudesEnvio = (req, res) => {
    const q = "select \
    solicitudenvio.idsolicitudenvio, \
    solicitudenvio.descripcionsolicitud,\
    solicitudenvio.pesopaquete, \
    solicitudenvio.tarifasolicitud, \
    solicitudenvio.idsolicitudenvio,fechasolicitud, \
    solicitudenvio.destinosolicitud, \
    cliente.nombrecliente \
    from solicitudenvio \
    inner join cliente on solicitudenvio.idcliente = cliente.idcliente";

    console.log("Entro");

    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length == 0) return res.status(409).json("No hay solicitudes de envio registradas");
        return res.status(200).json(data);
    });
}

export const deleteSolicitudEnvio = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("No estas autorizado");
    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        let clienteId = req.params.idCliente;
        console.log("Aqui ", clienteId);
        if (clienteId === "") return res.status(403).json("No se ha enviado el id del cliente");

        const q = "DELETE FROM solicitudenvio WHERE idCliente = ?";

        db.query(q, [clienteId], (err, data) => {

            if (err) return res.status(403).json("No puedes borrar estas solicitudes");
            return res.status(200).json("Solicitudes borradas con exito");
        });
    });
}
export const getSolicitudId = (req, res) => {
    const q = "SELECT cliente.idCliente, cliente.nombrecliente FROM solicitudenvio JOIN cliente ON solicitudenvio.idCliente = cliente.idCliente WHERE idsolicitudenvio= ? ";
    console.log(req.params);
    db.query(q, [req.params.idsolicitudenvio], (err, data) => {
        if (err) return res.status(500).json(err);
        console.log(err);
        if (data.length == 0) return res.json("No hay solicitudes de envio registradas");
        return res.status(200).json(data);
    });
}
export const getSolicitudIdCliente = (req, res) => {
    const q = "SELECT * FROM solicitudenvio WHERE idCliente= ? ";
    console.log(req.params);
    db.query(q, [req.params.idCliente], (err, data) => {
        if (err) return res.status(500).json(err);
        console.log(err);
        if (data.length == 0) return res.json("No hay solicitudes de envio registradas");
        return res.status(200).json(data);
    });
}
export const createSolEnvio = (req, res) => {
    const q1 = "SELECT * FROM solicitudenvio WHERE idsolicitudenvio = ?";
    console.log("Entro");

    db.query(q1, [req.body.idenvio], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("La solicitud de envío ya existe");
        const q2 = "INSERT INTO solicitudenvio(`idsolicitudenvio`,`descripcionsolicitud`,`pesopaquete`,`tarifasolicitud`,`fechasolicitud`,`destinosolicitud`,`idCliente`) values (?)";
        const values = [
            req.body.idsolicitudenvio,
            req.body.descripcionsolicitud,
            parseFloat(req.body.pesopaquete),
            req.body.tarifasolicitud,
            req.body.fechasolicitud,
            req.body.destinosolicitud,
            req.body.idCliente,
        ]
        db.query(q2, [values], (err, data) => {
            if (err) return res.json(err);
            return res.status(200).json("Solicitud de envío creado con éxito");
        });
    });
}

export const deleteSolEnvCliente = (req, res) => {
    let solicitudId = req.params.idsolicitudenvio;
    console.log("Aqui ", solicitudId);
    if (solicitudId === "") return res.status(403).json("No se ha enviado la Id de solicitud de envio");

    const q1 = "DELETE FROM solicitudenvio WHERE idsolicitudenvio = ?";

    db.query(q1, [solicitudId], (err, data) => {
        if (err) return res.status(403).json("No puedes borrar esta solicitud de envío");
    });
    return res.status(200).json("Solicitud de envío borrado con éxito");
}