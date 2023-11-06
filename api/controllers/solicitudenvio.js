import { db } from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const deleteSolicitudEnvio = (req,res) => {
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