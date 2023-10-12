import {db}  from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { usuario_log } from './auth.js';



export const updateuser = (req, res) => {

    const tipo_usuario = usuario_log.tipousuario;

    const query_cliente = "UPDATE cliente SET nombrecliente = ?, correocliente = ?, direccioncliente = ?, telefonocliente = ?, identificadorpregcliente = ?, respuestapregcliente = ? WHERE idCliente = ?";

    const query_administrador = "UPDATE administrador SET nombreadministrador = ?, correoadministrador = ?, direccionadministrador = ?, telefonoadministrador = ?, identificadorpregadministrador = ?, respuestapregadministrador = ? WHERE idadministrador = ?";

    const query_repartidor = "UPDATE repartidor SET nombrerepartidor = ?, correorepartidor = ?, direccionrepartidor = ?, telefonorepartidor = ?, identificadorpregrepartidor = ?, respuestapregrepartidor = ? WHERE idrepartidor = ?";

    const values = [
        req.body.nombreusuario,
        req.body.correousuario,
        req.body.direccionusuario,
        req.body.telefonousuario,
        req.body.identificadorpregusuario,
        req.body.respuestapregusuario,
        req.body.idusuario,
    ]

    if(tipo_usuario === "cliente"){
        
    
        db.query(query_cliente, values, (err, data) => {
            if (err) return res.json(err);
            console.log(data[0]);
            return res.status(200).json("Cliente actualizado con exito");
        });
    }else if(tipo_usuario === "administrador"){
    
        db.query(query_administrador, values, (err, data) => {
            if (err) return res.json(err);
            return res.status(200).json("Administrador actualizado con exito");
        });

    }else{
    
        db.query(query_repartidor, values, (err, data) => {
            if (err) return res.json(err);
            console.log(data[0]);
            return res.status(200).json("Repartidor actualizado con exito");
        });

    }

}


export const getuser = (req, res) => {

    const q = "select * from (select idCliente as idusuario, nombrecliente as nombreusuario, correocliente as correousuario, direccioncliente as direccionusuario, telefonocliente as telefonousuario, contrasenacliente as contrasenausuario, identificadorpregcliente as identificadorpregusuario, respuestapregcliente as respuestapregusuario, tipousuario from cliente union select idadministrador as idusuario, nombreadministrador as nombreusuario, correoadministrador as correousuario, direccionadministrador as direccionusuario, telefonoadministrador as telefonousuario, contrasenaadministrador as contrasenausuario, identificadorpregadmin as identificadorpregusuario, respuestapregadmin as respuestapregusuario, tipousuario from administrador union select idrepartidor as idusuario, nombrerepartidor as nombreusuario, correorepartidor as correousuario, direccionrepartidor as direccionusuario, telefonorepartidor as telefonousuario, contrasenarepartidor as contrasenausuario, identificadorpregrepar as identificadorpregusuario, respuestapregrepar as respuestapregusuario, tipousuario from repartidor) as usuarios where idusuario = ?";
    
    db.query(q, [req.body.idusuario], (err, data2) => {
        if (err) return res.json(err);
        console.log(data2[0]);
        return res.status(200).json(data2[0]);
    });
}
