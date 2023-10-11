import {db}  from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// const db = require('../db.js');

export const registerClients = (req, res) => {

    //Verificar si el usuario ya existe

    const q = "SELECT * FROM cliente WHERE idCliente = ?";

    console.log("Entro")
    //console.log

    db.query(q, [parseInt(req.body.idCliente)], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("El usuario ya esta registrado");

        //Encriptar contraseña

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.contrasenacliente, salt);

        const q = "INSERT INTO cliente(`idCliente`,`nombrecliente`,`correocliente`,`direccioncliente`,`telefonocliente`,`contrasenacliente`,`identificadorpregcliente`,`respuestapregcliente`) values (?)";

        const values = [
            req.body.idCliente,
            req.body.nombrecliente,
            req.body.correocliente,
            req.body.direccioncliente,
            req.body.telefonocliente,
            hash,
            req.body.identificadorpregcliente,
            req.body.respuestapregcliente,
        ]

        db.query(q, [values], (err, data) => {
            if (err) return res.json(err);
            return res.status(200).json("Usuario creado con exito");
        });


    });


};

export const login = (req, res) => {
    //Se verifica el usuario
    const q = "select * from (select idCliente as idusuario, nombrecliente as nombreusuario, correocliente as correousuario, direccioncliente as direccionusuario, telefonocliente as telefonousuario, contrasenacliente as contrasenausuario, identificadorpregcliente as identificadorpregusuario, respuestapregcliente as respuestapregusuario, tipousuario from cliente union select idadministrador as idusuario, nombreadministrador as nombreusuario, correoadministrador as correousuario, direccionadministrador as direccionusuario, telefonoadministrador as telefonousuario, contrasenaadministrador as contrasenausuario, identificadorpregadmin as identificadorpregusuario, respuestapregadmin as respuestapregusuario, tipousuario from administrador union select idrepartidor as idusuario, nombrerepartidor as nombreusuario, correorepartidor as correousuario, direccionrepartidor as direccionusuario, telefonorepartidor as telefonousuario, contrasenarepartidor as contrasenausuario, identificadorpregrepar as identificadorpregusuario, respuestapregrepar as respuestapregusuario, tipousuario from repartidor) as usuarios where idusuario = ?";

    //Validación de identidad del usuario ingresado
    db.query(q, [req.body.idusuario], (err, data) => {
        if (err) return res.status(500).json("Ha pasado algo ", err);
        if (data.length === 0) return res.status(404).json("¡Usuario no encontrado!");

        //Verificación de contrasena
        const isPasswordCorrect = bcrypt.compareSync(req.body.contrasenausuario, data[0].contrasenausuario);
        
        if (!isPasswordCorrect) return res.status(400).json("¡Contraseña incorrecta!");

        const token = jwt.sign({ id: data[0].idusuario }, "jwtkey");
        const { contrasenausuario, ...other } = data[0];

        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(other);

    });

};

export const logout = (req, res) => {
    res.clearCookie("access_token",{
        sameSite: "none",
        secure: true
    }).status(200).json("Sesion cerrada con exito");
}