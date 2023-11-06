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
        //console.log(respuesta);
        return respuesta; 
    });
}


export const registerRepartidores = (req, res) => {
        //Verificar si el usuario ya existe
        const q = "SELECT * FROM repartidor WHERE idRepartidor = ?";
        console.log("Entro")
        //console.log
        db.query(q, [req.body.idRepartidor], (err, data) => {
            if (err) return res.status(500).json(err);
            console.log(err);
            if (data.length) return res.status(409).json("El registrador ya esta registrado");
            //Encriptar contraseña
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.contrasenaRepartidor, salt);
            const q = "INSERT INTO repartidor(`idrepartidor`,`nombrerepartidor`,`correorepartidor`,`direccionrepartidor`,`telefonorepartidor`,`contrasenarepartidor`,`identificadorpregrepar`,`respuestapregrepar`) values (?)";
            const values = [
                req.body.idRepartidor,
                req.body.nombreRepartidor,
                req.body.correoRepartidor,
                req.body.direccionRepartidor,
                req.body.telefonoRepartidor,
                hash,
                req.body.identificadorPregRepar,
                req.body.respuestaPregRepar,
            ]
    
            db.query(q, [values], (err, data) => {
                if (err) return res.json(err);
                return res.status(200).json("Repartidor creado con exito");
            });
        });
}


export const deleteRepartidor = (req, res) => {
    const token = req.cookies.access_token;
    if(!token) return res.status(401).json("No estas autorizado");
    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        
        let repartidorId = req.params.idrepartidor;

        const q = "DELETE FROM repartidor WHERE idrepartidor = ?";

        db.query(q, [repartidorId], (err, data) => {
            if (err) return res.status(403).json("No puedes borrar este repartidor");
            return res.status(200).json("Repartidor borrado con exito");
        });
    });
}