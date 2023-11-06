import { db } from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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