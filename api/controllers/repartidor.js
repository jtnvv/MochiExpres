// import express from 'express';
// const appdealers = express()
// import { db } from '../db.js';
// import cors from 'cors';

// appdealers.use(cors());
// appdealers.use(express.json());

// export const paginaInicio = (req, res) => {
//     res.send("Pagina de inicio")
// }

// appdealers.listen(3006,()=>{
//     console.log("Corriendo en 3006, lista de repartidores")
// })

// appdealers.get("/dealers", (req,res) => {
//     db.query('SELECT * from repartidor',
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

export const getRepartidores = (req, res) => {
    const q = "SELECT * FROM repartidor";

    console.log("Entro");

    db.query(q, (err, data) => {
        if(err) return res.status(500).json(err);
        console.log(err);
        if(data.length == 0) return res.status(409).json("No hay repartidores registrados");
        let respuesta = res.status(200).json(data);
        console.log(respuesta);
        return respuesta; 
    });
}


export const registerRepartidores = (req, res) => {

}