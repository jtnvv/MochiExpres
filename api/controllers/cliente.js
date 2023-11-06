// import express from 'express';
// const app = express()
// import { db } from '../db.js';
// import cors from 'cors';

// app.use(cors());
// app.use(express.json());


// export const addCliente = (req, res) => {
//     res.send("desde controller!")
// }

// export const paginaInicio = (req, res) => {
//     res.send("Pagina de inicio")
// }

// app.listen(3005,()=>{
//     console.log("Corriendo en 3005, lista de clientes")
// })

// app.get("/clients", (req,res) => {
//     db.query('SELECT * from cliente',
//         (err, result)=> {
//             if(err){
//                 console.log(err);
//             }
//             else {
//                 res.send(result)
//             }
//         }
//     )
// })

import { db } from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { deleteEnvio } from './envio.js';
import { deleteSolicitudEnvio } from './solicitudenvio.js';

export const getClientes = (req, res) => {
    const q = "SELECT * FROM cliente";

    console.log("Entro");

    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        console.log(err);
        if (data.length == 0) return res.status(409).json("No hay clientes registrados");
        return res.status(200).json(data);

    });
}

export const deleteCliente = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("No estas autorizado");
    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        let clienteId = req.params.idCliente;
        console.log("Aqui ", clienteId);
        if (clienteId === "") return res.status(403).json("No se ha enviado el id del cliente");

        const q = "DELETE FROM cliente WHERE idCliente = ?";

        db.query(q, [clienteId], (err, data) => {

            if (err) return res.status(403).json("No puedes borrar este cliente");
            return res.status(200).json("Cliente borrado con exito");
        });
    });
}
