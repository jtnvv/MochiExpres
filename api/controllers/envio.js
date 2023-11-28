import { db } from '../db.js';
import jwt from 'jsonwebtoken';
import { usuario_log } from './auth.js';
import { registrarOperacion } from './auditoria.js';

export const createEnvio = (req, res) => {
    const q1 = "SELECT * FROM envio WHERE idenvio = ?";
    console.log("Entro");
    
    db.query(q1, [req.body.idenvio], (err, data) => {
        if (err) {
            registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario,"CREATE", "Envio", "Desconocido", "Error en conexión con la base de datos", "Fallido", new Date(), res);
            return res.status(500).json(err);
        }
        if (data.length) {
            registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario,"CREATE", "Envio", req.body.idenvio, `El envío con identificador ${req.body.idenvio} ya existe`, "Fallido", new Date(), res);
            return res.status(409).json("El envío ya existe");
        }

        const q3 = "SELECT * FROM envio WHERE idsolicitudenvio = ?";
        db.query(q3, [req.body.idsolicitudenvio], (err, data) => {

            if (err) {
                registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario,"GET", "Envio", "Desconocido", "Error en conexión con la base de datos", "Fallido", new Date(), res);
                return res.status(500).json(err);
            }
            if (data.length) {
                registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario,"GET", "Envio", data[0].idenvio, `La solicitud con identificador ${req.body.idsolicitudenvio} ya tiene un envío asociado`, "Fallido", new Date(), res);
                return res.status(409).json("La solicitud ya tiene un envío asociado");
            }

            const q2 = "INSERT INTO envio(`idenvio`,`descripcionpaquete`,`estadoenvio`,`tarifaenvio`,`fechaenvioentregado`,`fechaenviorealizado`,`destinoenvio`,`idrepartidor`,`idsolicitudenvio`) values (?)";
            const values = [
                req.body.idenvio,
                req.body.descripcionpaquete,
                req.body.estadoenvio,
                req.body.tarifaenvio,
                req.body.fechaenvioentregado,
                req.body.fechaenviorealizado,
                req.body.destinoenvio,
                req.body.idrepartidor,
                req.body.idsolicitudenvio,
            ]
            db.query(q2, [values], (err, data) => {
                if (err) {
                    registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario,"CREATE", "Envio", req.body.idenvio, "Error en la inserción del envío", "Fallido", new Date(), res);
                    return res.json(err);
                }
                registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario,"CREATE", "Envio", req.body.idenvio, "Envío creado con éxito", "Exitoso", new Date(), res);
                return res.status(200).json("Envío creado con éxito");
            });
        });
    });
}


export const getEnvios = (req, res) => {
    const q = "SELECT * FROM envio";
    //console.log("Entro");
    db.query(q, (err, data) => {
        if (err) {
            registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario,"GET", "Envio", "Tabla envios", "Error en conexión con la base de datos", "Fallido", new Date(), res);
            return res.status(500).json(err);
        }
        //console.log(err);
        if (data.length == 0) {
            registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario,"GET", "Envio", "Tabla envios", "No hay envíos registrados", "Fallido", new Date(), res);
            return res.status(409).json("No hay envíos registrados");
        }
        registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario,"GET", "Envio", "Tabla envios", "Envíos consultados con exito", "Exitoso", new Date(), res);
        return res.status(200).json(data);
    });
}

export const getEnviosCliente = (req, res) => {
    const q = "SELECT e.idenvio, e.descripcionpaquete, e.estadoenvio, e.tarifaenvio, e.fechaenvioentregado, e.fechaenviorealizado, e.destinoenvio, e.idrepartidor, e.idsolicitudenvio, s.tarifasolicitud, s.pesopaquete, s.idCliente FROM (envio e JOIN solicitudenvio s ON e.idsolicitudenvio = s.idsolicitudenvio) WHERE s.idCliente = ?";
    console.log("Entro");
    console.log("Aquiiiii ", req.params.idCliente);
    db.query(q, [req.params.idCliente], (err, data) => {
        if (err) {
            registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario,"GET", "Envio", "Tabla envios", "Error en conexión con la base de datos", "Fallido", new Date(), res);
            return res.status(500).json(err);
        }
        //console.log(err);
        if (data.length == 0) {
            registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario,"GET", "Envio", "Tabla envios", `No hay envíos registrados dado el cliente ${req.params.idCliente}`, "Fallido", new Date(), res);
            return res.status(409).json("No hay envíos registrados");
        }
        registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario,"GET", "Envio", "Tabla envios", `Envíos dado el cliente ${req.params.idCliente} consultados con exito`, "Exitoso", new Date(), res);
        return res.status(200).json(data);
    });
}

export const getEnviosRepartidor = (req, res) => {
    const q = "SELECT * from envio where idrepartidor =?";
    console.log("Entro");
    console.log("Aquiiiii ", req.params.idRepartidor);
    db.query(q, [req.params.idRepartidor], (err, data) => {
        if (err) {
            registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario,"GET", "Envio", "Tabla envios", "Error en conexión con la base de datos", "Fallido", new Date(), res);
            return res.status(500).json(err);
        }
        //console.log(err);
        if (data.length == 0) {
            registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario,"GET", "Envio", "Tabla envios", `No hay envíos registrados dado el repartidor ${req.params.idRepartidor}`, "Fallido", new Date(), res);
            return res.status(409).json("No hay envíos registrados");
        }
        registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario,"GET", "Envio", "Tabla envios", `Envíos dado el repartidor ${req.params.idRepartidor} consultados con exito`, "Exitoso", new Date(), res);
        return res.status(200).json(data);
    });
}

export const deleteEnvio = (req, res) => {

    const token = req.cookies.access_token;
    if (!token) {
        registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario,"DELETE", "Envio", "Desconocido", "El usuario no está autorizado para realizar esta operación", "Fallido", new Date(), res);
        return res.status(401).json("No estas autorizado");
    }
    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) {
            registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario,"DELETE", "Envio", "Desconocido", "El usuario no cuenta con un token válido.", "Fallido", new Date(), res);
            return res.status(403).json("Token is not valid!");
        }
        let clienteId = req.params.idCliente;
        console.log("Aqui ", clienteId);
        if (clienteId === "") {
            registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario,"DELETE", "Envio", "Desconocido", "No se ha enviado el id del cliente", "Fallido", new Date(), res);
            return res.status(403).json("No se ha enviado el id del cliente");
        }

        const q1 = "SELECT idsolicitudenvio FROM solicitudenvio WHERE idCliente = ?";


        db.query(q1, [clienteId], (err, solicitudes) => {
            if (err) {
                registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario,"DELETE", "Envio", `Solicitudes del cliente ${clienteId}`, `No se pueden obtener las solicitudes del cliente ${clienteId}`, "Fallido", new Date(), res);
                return res.status(403).json("No se pueden obtener las solicitudes");
            }
            if (solicitudes.length === 0) {
                registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario,"DELETE", "Envio", `Solicitudes del cliente ${clienteId}`, `No hay solicitudes para el cliente ${clienteId}`, "Fallido", new Date(), res);
                return res.status(404).json("No hay solicitudes para este cliente");
            }

            solicitudes.array.forEach(solicitud => {
                const q2 = "DELETE FROM envio WHERE idsolicitudenvio = ?";
                db.query(q2, [solicitud.idsolicitudenvio], (err, data) => {
                    if (err) {
                        registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario,"DELETE", "Envio", `Envio con id solicitud ${solicitud.idsolicitudenvio}`, `No se pueden borrar el envio con id de solicitud ${solicitud.idsolicitudenvio} del cliente ${clienteId}`, "Fallido", new Date(), res);
                        return res.status(403).json("No puedes borrar este envío");
                    }
                    registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario,"DELETE", "Envio", `Envio con id solicitud ${solicitud.idsolicitudenvio}`, `Envio con id de solicitud ${solicitud.idsolicitudenvio} del cliente ${clienteId} borrado con éxito`, "Exitoso", new Date(), res);
                });
            });
            registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario,"DELETE", "Envio", `Envios del cliente ${clienteId}`, `Envios del cliente ${clienteId} borrados con éxito`, "Exitoso", new Date(), res);
            return res.status(200).json("Envíos borrados con éxito");

        });

    });

}

export const deleteEnvioId = (req, res) => {
    console.log(req.params.idenvio);
    const token = req.cookies.access_token;
    if (!token) {
        registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario,"DELETE", "Envio", "Desconocido", "El usuario no está autorizado para realizar esta operación", "Fallido", new Date(), res);
        return res.status(401).json("No estas autorizado");
    }

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) {
            registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario,"DELETE", "Envio", "Desconocido", "El usuario no cuenta con un token válido.", "Fallido", new Date(), res);
            return res.status(403).json("Token is not valid!");
        }
        let envioId = req.params.idenvio;
        console.log("Aqui esta el id", envioId);
        if (envioId === "") {
            registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario,"DELETE", "Envio", "Desconocido", "No se ha enviado el id del envio", "Fallido", new Date(), res);
            return res.status(403).json("No se ha enviado el id del envio");
        }


        const q = "DELETE FROM envio WHERE idenvio = ?";

        db.query(q, [envioId] , (err, data) => {
            console.log("Aca esta el maldito ", envioId);
            if (err) {
                registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario,"DELETE", "Envio", envioId, "Error en conexión con la base de datos", "Fallido", new Date(), res);
                return res.status(403).json("No puedes borrar este envio");
            }
            registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario,"DELETE", `El envio con el identificador ${envioId} fue borrado con éxito`, "Exitoso", new Date(), res);
            return res.status(200).json("Envio borrado con exito");
        });

    });
};

export const updateEnvioEstado = (req, res) => {
    const values = [
        req.body.estadoenvio,
        req.body.idenvio,
    ]

    const q = "UPDATE envio SET estadoenvio = ? WHERE idenvio = ?";

    db.query(q, values, (err, data) => {
        if (err) {
            registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario,"UPDATE", "Envio", req.body.idenvio, "Error en conexión con la base de datos", "Fallido", new Date(), res);
            return res.status(500).json(err);
        }
        registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario,"UPDATE", "Envio", req.body.idenvio, `Estado envío a ${req.body.estadoenvio} actualizado con éxito`, "Exitoso", new Date(), res);
        return res.status(200).json("Estado envío actualizado con éxito");
    });
}

export const updateEnvioRepartidor = (req, res) => {
    const values = [
        req.body.idrepartidor,
        req.body.idenvio,
    ]

    const q = "UPDATE envio SET idrepartidor = ? WHERE idenvio = ?";

    db.query(q, values, (err, data) => {
        if (err) {
            registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario,"UPDATE", "Envio", req.body.idenvio, "Error en conexión con la base de datos", "Fallido", new Date(), res);
            return res.status(500).json(err);
        }
        registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario,"UPDATE", "Envio", req.body.idenvio, `Repartidor con identificador ${req.body.idrepartidor} asignado al envío ${req.body.idenvio} con éxito`, "Exitoso", new Date(), res);
        return res.status(200).json("Repartidor envío actualizado con éxito");
    });
}