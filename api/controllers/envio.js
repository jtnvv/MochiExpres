import { db } from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const createEnvio = (req, res) => {
    const q1 = "SELECT * FROM envio WHERE idenvio = ?";
    console.log("Entro");
    
    db.query(q1, [req.body.idenvio], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("El envío ya existe");

        const q3 = "SELECT * FROM envio WHERE idsolicitudenvio = ?";
        db.query(q3, [req.body.idsolicitudenvio], (err, data) => {

            if (err) return res.status(500).json(err);
            if (data.length) return res.status(409).json("La solicitud ya tiene un envío asociado");

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
                if (err) return res.json(err);
                return res.status(200).json("Envío creado con éxito");
            });
        });
    });
}


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
    db.query(q, [req.params.idCliente], (err, data) => {
        if (err) return res.status(500).json(err);
        //console.log(err);
        if (data.length == 0) return res.status(409).json("No hay envíos registrados");
        return res.status(200).json(data);
    });
}

export const getEnviosRepartidor = (req, res) => {
    const q = "SELECT * from envio where idrepartidor =?";
    console.log("Entro");
    console.log("Aquiiiii ", req.params.idRepartidor);
    db.query(q, [req.params.idRepartidor], (err, data) => {
        if (err) return res.status(500).json(err);
        //console.log(err);
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

export const updateEnvioEstado = (req, res) => {
    const values = [
        req.body.estadoenvio,
        req.body.idenvio,
    ]

    const q = "UPDATE envio SET estadoenvio = ? WHERE idenvio = ?";

    db.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err);
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
        if (err) return res.status(500).json(err);
        return res.status(200).json("Repartidor envío actualizado con éxito");
    });
}