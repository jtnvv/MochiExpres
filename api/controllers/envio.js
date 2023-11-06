import { db } from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const deleteEnvio = (idCliente) => {
        
        let clienteId = idCliente;
        console.log("Aqui ", clienteId);
        if (clienteId === "") {
            return "No se ha enviado el id del cliente";
            
        }

        const q1 = "SELECT idsolicitudenvio FROM solicitudenvio WHERE idCliente = ?";
        

        db.query(q1, [clienteId], (err, solicitudes) => {
            if (err) return "No se pueden obtener las solicitudes";
            if (solicitudes.length === 0) return ("No hay solicitudes para este cliente");

            solicitudes.array.forEach(solicitud => {
                const q2 = "DELETE FROM envio WHERE idsolicitudenvio = ?";
                db.query(q2, [solicitud.idsolicitudenvio], (err, data) => {
                    if (err) return ("No se pueden borrar los envios");
                });
            });
            return "Envíos borrados con éxito";

        });
}