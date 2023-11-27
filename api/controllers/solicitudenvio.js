import { db } from '../db.js';
import jwt from 'jsonwebtoken';
import { usuario_log } from './auth.js';
import { registrarOperacion } from './auditoria.js';

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
        if (err) {
            registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario, "GET", "Solicitud de envio", "Tabla de solicitudes de envio", "Error en conexión con la base de datos", "Fallido", new Date(), res);
            return res.status(500).json(err);
        }
        if (data.length == 0) {
            registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario, "GET", "Solicitud de envio", "Tabla de solicitudes de envio", "No hay solicitudes de envio registradas", "Fallido", new Date(), res);
            return res.status(409).json("No hay solicitudes de envio registradas");
        }
        registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario, "GET", "Solicitud de envio", "Tabla de solicitudes de envio", "Consulta de solicitudes de envio exitosa", "Exitoso", new Date(), res);
        return res.status(200).json(data);
    });
}

export const deleteSolicitudEnvio = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) {
        registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario, "DELETE", "Solicitud de envio", "Desconocido", "El usuario no cuenta con los permisos para realizar esta operación", "Fallido", new Date(), res);
        return res.status(401).json("No estas autorizado");
    }
    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) {
            registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario, "DELETE", "Solicitud de envio", "Desconocido", "El usuario no cuenta con un Token válido para realizar la operación", "Fallido", new Date(), res);
            return res.status(403).json("Token is not valid!");
        }

        let clienteId = req.params.idCliente;
        console.log("Aqui ", clienteId);
        if (clienteId === "") {
            registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario, "DELETE", "Solicitud de envio", "Desconocido", "No se ha enviado el id del cliente", "Fallido", new Date(), res);
            return res.status(403).json("No se ha enviado el id del cliente");
        }

        const q = "DELETE FROM solicitudenvio WHERE idCliente = ?";

        db.query(q, [clienteId], (err, data) => {

            if (err) {
                registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario, "DELETE", "Solicitud de envio", clienteId, `No se puede eliminar las solicitud del cliente con identificador ${clienteId}`, "Fallido", new Date(), res);
                return res.status(403).json("No puedes borrar estas solicitudes");
            }
            registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario, "DELETE", "Solicitud de envio", clienteId, `Solicitudes del cliente con identificador ${clienteId} borradas con exito`, "Exitoso", new Date(), res);
            return res.status(200).json("Solicitudes borradas con exito");
        });
    });
}
export const getSolicitudId = (req, res) => {
    const q = "SELECT cliente.idCliente, cliente.nombrecliente FROM solicitudenvio JOIN cliente ON solicitudenvio.idCliente = cliente.idCliente WHERE idsolicitudenvio= ? ";
    console.log(req.params);
    db.query(q, [req.params.idsolicitudenvio], (err, data) => {
        if (err) {
            registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario, "GET", "Solicitud de envio", "Desconocido", "Error en conexión con la base de datos", "Fallido", new Date(), res);
            return res.status(500).json(err);
        }
        console.log(err);
        if (data.length == 0) {
            registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario, "GET", "Solicitud de envio", "Desconocido", `No hay solicitudes de envio registradas con el identificador ${req.params.idsolicitudenvio}`, "Fallido", new Date(), res);
            return res.json("No hay solicitudes de envio registradas");
        }
        registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario, "GET", "Solicitud de envio", req.params.idsolicitudenvio, `Consulta de solicitud de envio con el identificador ${req.params.idsolicitudenvio} exitosa`, "Exitoso", new Date(), res);
        return res.status(200).json(data);
    });
}
export const getSolicitudIdCliente = (req, res) => {
    const q = "SELECT * FROM solicitudenvio WHERE idCliente= ? ";
    console.log(req.params);
    db.query(q, [req.params.idCliente], (err, data) => {
        if (err) {
            registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario, "GET", "Solicitud de envio", "Desconocido", "Error en conexión con la base de datos", "Fallido", new Date(), res);
            return res.status(500).json(err);
        }
        console.log(err);
        if (data.length == 0) {
            registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario, "GET", "Solicitud de envio", "Desconocido", `No hay solicitudes de envio registradas con el identificador ${req.params.idCliente}`, "Fallido", new Date(), res);
            return res.json("No hay solicitudes de envio registradas");
        }
        registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario, "GET", "Solicitud de envio", req.params.idCliente, `Consulta de solicitudes de envio con el identificador ${req.params.idCliente} exitosa`, "Exitoso", new Date(), res);
        return res.status(200).json(data);
    });
}
export const createSolEnvio = (req, res) => {
    const q1 = "SELECT * FROM solicitudenvio WHERE idsolicitudenvio = ?";
    console.log("Entro");

    db.query(q1, [req.body.idenvio], (err, data) => {
        if (err) {
            registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario, "CREATE", "Solicitud de envio", "Desconocido", "Error en conexión con la base de datos", "Fallido", new Date(), res);
            return res.status(500).json(err);
        }
        if (data.length) {
            registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario, "CREATE", "Solicitud de envio", req.body.idenvio, `La solicitud de envio con identificador ${req.body.idenvio} ya esta registrada`, "Fallido", new Date(), res);
            return res.status(409).json("La solicitud de envío ya existe");
        }
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
            if (err) {
                registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario, "CREATE", "Solicitud de envio", req.body.idsolicitudenvio, "Error en conexión con la base de datos", "Fallido", new Date(), res);
                return res.json(err);
            }
            registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario, "CREATE", "Solicitud de envio", req.body.idsolicitudenvio, `Solicitud de envio con identificador ${req.body.idsolicitudenvio} creada con exito`, "Exitoso", new Date(), res);
            return res.status(200).json("Solicitud de envío creado con éxito");
        });
    });
}

export const deleteSolEnvCliente = (req, res) => {
    let solicitudId = req.params.idsolicitudenvio;
    console.log("Aqui ", solicitudId);
    if (solicitudId === "") {
        registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario, "DELETE", "Solicitud de envio", "Desconocido", "No se ha enviado la Id de solicitud de envio", "Fallido", new Date(), res);
        return res.status(403).json("No se ha enviado la Id de solicitud de envio");
    }

    const q1 = "DELETE FROM solicitudenvio WHERE idsolicitudenvio = ?";

    db.query(q1, [solicitudId], (err, data) => {
        if (err) {
            registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario, "DELETE", "Solicitud de envio", solicitudId, `No se puede eliminar la solicitud de envio con identificador ${solicitudId}`, "Fallido", new Date(), res);
            return res.status(403).json("No puedes borrar esta solicitud de envío");
        }
    });
    registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario, "DELETE", "Solicitud de envio", solicitudId, `Solicitud de envio con identificador ${solicitudId} borrada con exito`, "Exitoso", new Date(), res);
    return res.status(200).json("Solicitud de envío borrado con éxito");
}