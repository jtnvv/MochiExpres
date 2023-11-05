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

export const getClientes = (req, res) => {
    const q = "SELECT * FROM cliente";

    console.log("Entro");

    db.query(q, (err, data) => {
        if(err) return res.status(500).json(err);
        console.log(err);
        if(data.length == 0) return res.status(409).json("No hay clientes registrados");
        return res.status(200).json(data);
        
    });
}
