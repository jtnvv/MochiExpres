import { db } from '../db.js';
import jwt from 'jsonwebtoken';
import { usuario_log } from './auth.js';
import { registrarOperacion } from './auditoria.js';
import {decryptData} from './auth.js';

export const getClientes = (req, res) => {
    const q = "SELECT * FROM cliente";

    console.log("Entro");

    db.query(q, (err, data) => {
        if (err) {
            registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario,"GET", "Cliente", "Tabla cliente", "Error en conexión con la base de datos", "Fallido", new Date(), res);
            return res.status(500).json(err)
        };
        console.log(err);
        if (data.length == 0) {
            registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario,"GET", "Cliente", "Tabla cliente", "No hay clientes registrados", "Fallido", new Date(), res);
            return res.status(409).json("No hay clientes registrados");
        }
        registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario,"GET", "Cliente", "Tabla cliente", "Clientes consultados con exito", "Exitoso", new Date(), res);
        
        datosDesencriptados = data.map((cliente) => {
            return{
                ...cliente,
                correocliente: decryptData(cliente.correocliente),
                direccioncliente: decryptData(cliente.direccioncliente),
                telefonocliente: decryptData(cliente.telefonocliente),
                respuestapregcliente: decryptData(cliente.respuestapregcliente)
            };
        });
        
        return res.status(200).json(datosDesencriptados);

    });
}

export const getClienteId = (req, res) => {
    const q = "SELECT * FROM cliente WHERE idCliente = ?";

    db.query(q, [req.params.idCliente], (err, data) => {
        if (err) {
            registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario,"GET", "Cliente", "Desconocido", "Error en conexión con la base de datos", "Fallido", new Date(), res);
            return res.status(500).json(err);
        }
        console.log(err);
        if (data.length == 0) {
            registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario,"GET", "Cliente", "Desconocido", `El cliente dado el identificador ${req.params.idCliente} no está registrado`, "Fallido", new Date(), res);
            return res.status(409).json("El cliente dado el identificador no está registrado");
        }
        registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario,"GET", "Cliente", req.params.idCliente, `Cliente dado el identificador ${req.params.idCliente} fue consultado con exito`, "Exitoso", new Date(), res);

        data[0].correocliente = decryptData(data[0].correocliente);
        data[0].direccioncliente = decryptData(data[0].direccioncliente);
        data[0].telefonocliente = decryptData(data[0].telefonocliente);
        data[0].respuestapregcliente = decryptData(data[0].respuestapregcliente);

        return res.status(200).json(data[0]);
    });
}

export const getClienteSolId = (req, res) => {
    const q = "SELECT c.idCliente, c.nombrecliente, c.correocliente, c.direccioncliente, c.telefonocliente, c.contrasenacliente, c.identificadorpregcliente, c.respuestapregcliente, c.tipousuario, s.idsolicitudenvio FROM (cliente c JOIN solicitudenvio s ON (c.idCliente = s.idCliente)) WHERE idsolicitudenvio = ?";

    db.query(q, [req.params.idsolicitudenvio], (err, data) => {
        if (err) {
            registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario,"GET", "Cliente", "Desconocido", "Error en conexión con la base de datos", "Fallido", new Date(), res);
            return res.status(500).json(err);
        }
        console.log(err);
        if (data.length == 0) {
            registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario,"GET", "Cliente", "Desconocido", `El cliente dada la solicitud ${req.params.idsolicitudenvio} no está registrado`, "Fallido", new Date(), res);
            return res.status(409).json("El cliente dada la solicitud no está registrado");
        }
        registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario,"GET", "Cliente", data[0].idCliente, `Cliente dada la solicitud ${req.params.idsolicitudenvio} fue consultado con exito`, "Exitoso", new Date(), res);
        data[0].correocliente = decryptData(data[0].correocliente);
        data[0].direccioncliente = decryptData(data[0].direccioncliente);
        data[0].telefonocliente = decryptData(data[0].telefonocliente);
        data[0].respuestapregcliente = decryptData(data[0].respuestapregcliente);
        return res.status(200).json(data[0]);
    });
}

export const deleteCliente = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) {
        registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario,"DELETE", "Cliente", req.params.idCliente, "El usuario no cuenta con los permisos para eliminar", "Fallido", new Date(), res);
        return res.status(401).json("No estas autorizado");
    }
    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) {
            registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario,"DELETE", "Cliente", req.params.idCliente, "El usuario cuenta con un token inválido", "Fallido", new Date(), res);
            return res.status(403).json("Token is not valid!");
        }

        let clienteId = req.params.idCliente;
        console.log("Aqui ", clienteId);
        if (clienteId === "") {
            registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario,"DELETE", "Cliente", "Desconocido", "El usuario no ha enviado el id del cliente en la petición", "Fallido", new Date(), res);
            return res.status(403).json("No se ha enviado el id del cliente");
        }

        const q = "DELETE FROM cliente WHERE idCliente = ?";

        db.query(q, [clienteId], (err, data) => {

            if (err) {
                registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario,"DELETE", "Cliente", clienteId, "Error en conexión con la base de datos", "Fallido", new Date(), res);
                return res.status(403).json("No puedes borrar este cliente");
            }
            registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario,"DELETE", `El cliente con el identificador ${clienteId} fue borrado con éxito`, "Exitoso", new Date(), res);
            return res.status(200).json("Cliente borrado con exito");
        });
    });
}
