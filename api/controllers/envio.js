import { db } from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const getEnvios = (req, res) => {
    const q = "SELECT * FROM envio";
    //console.log("Entro");
    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        //console.log(err);
        if (data.length == 0) return res.status(409).json("No hay envíos registrados");
        return res.status(200).json(data);
    });
}

export const getEnviosCliente = (req, res) => {
    const q = "SELECT e.idenvio, e.descripcionpaquete, e.estadoenvio, e.tarifaenvio, e.fechaenvioentregado, e.fechaenviorealizado, e.destinoenvio, e.idrepartidor, e.idsolicitudenvio, s.tarifasolicitud, s.pesopaquete, s.idCliente FROM (envio e JOIN solicitudenvio s ON e.idsolicitudenvio = s.idsolicitudenvio) WHERE s.idCliente = ?";
    console.log("Entro");
    console.log("Aquiiiii ", req.params.idCliente);
    db.query(q, [req.params.idCliente],(err, data) => {
        if (err) return res.status(500).json(err);
        console.log(err);
        if (data.length == 0) return res.status(409).json("No hay envíos registrados");
        return res.status(200).json(data);
    });
}

export const deleteEnvio = (req, res) => {


    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("No estas autorizado");
    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        let clienteId = req.params.idCliente;
        console.log("Aqui ", clienteId);
        if (clienteId === "") return res.status(403).json("No se ha enviado el id del cliente");

        const q1 = "SELECT idsolicitudenvio FROM solicitudenvio WHERE idCliente = ?";


        db.query(q1, [clienteId], (err, solicitudes) => {
            if (err) return res.status(403).json("No se pueden obtener las solicitudes");
            if (solicitudes.length === 0) return res.status(404).json("No hay solicitudes para este cliente");

            solicitudes.array.forEach(solicitud => {
                const q2 = "DELETE FROM envio WHERE idsolicitudenvio = ?";
                db.query(q2, [solicitud.idsolicitudenvio], (err, data) => {
                    if (err) return res.status(403).json("No puedes borrar este envío");
                });
            });
            return res.status(200).json("Envíos borrados con éxito");

        });

    });

}