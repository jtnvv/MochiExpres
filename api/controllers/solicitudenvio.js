import { db } from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const deleteSolicitudEnvio = (idCliente) => {
        let clienteId = idCliente;
        console.log("Aqui ", clienteId);
        if (clienteId === "") return ("No se ha enviado el id del cliente");

        const q = "DELETE FROM solicitudenvio WHERE idCliente = ?";

        db.query(q, [clienteId], (err, data) => {
            if (data.length === 0) return ("No hay solicitudes para este cliente");
            if (err) return "No puedes borrar esta solicitud";
            return "Solicitudes borradas con exito";
        });
}