import { db } from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { registrarLog } from './auditoria.js';
// const db = require('../db.js');

export const usuario_log = {
    idusuario: "",
    nombreusuario: "",
    correousuario: "",
    direccionusuario: "",
    telefonousuario: "",
    contrasenausuario: "",
    identificadorpregusuario: "",
    respuestapregusuario: "",
    tipousuario: ""
};

export const registerClients = (req, res) => {

    //Verificar si el usuario ya existe

    const q = "SELECT * FROM cliente WHERE idCliente = ?";

    console.log("Entro")
    //console.log

    db.query(q, [req.body.idCliente], (err, data) => {
        if (err) return res.status(500).json(err);
        console.log(err);
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
        if (err) {
            registrarLog(req.body.idusuario, "No determinado", "Desconocido", "Login", "Error en conexión con la base de datos","Fallido", new Date());
            return res.status(500).json("Ha pasado algo al conectar con la base de datos");
        }
        if (data.length === 0) {
            registrarLog(req.body.idusuario, "No determinado", "Desconocido", "Login", "El usuario no fue encontrado", "Fallido", new Date());
            return res.status(404).json("¡Usuario no encontrado!")
        };

        //Verificación de contrasena
        const isPasswordCorrect = bcrypt.compareSync(req.body.contrasenausuario, data[0].contrasenausuario);

        if (!isPasswordCorrect) {
            registrarLog(req.body.idusuario, data[0].tipousuario, data[0].nombreusuario, "Login", "Contraseña incorrecta", "Fallido", new Date());
            return res.status(400).json("¡Contraseña incorrecta!");
        };

        

        const token = jwt.sign({ id: data[0].idusuario }, "jwtkey");
        const { contrasenausuario, ...other } = data[0];

        usuario_log.idusuario = data[0].idusuario;
        usuario_log.nombreusuario = data[0].nombreusuario;
        usuario_log.contrasenausuario = data[0].contrasenausuario;
        usuario_log.correousuario = data[0].correousuario;
        usuario_log.direccionusuario = data[0].direccionusuario;
        usuario_log.telefonousuario = data[0].telefonousuario;
        usuario_log.contrasenausuario = data[0].contrasenausuario;
        usuario_log.identificadorpregusuario = data[0].identificadorpregusuario;
        usuario_log.respuestapregusuario = data[0].respuestapregusuario;
        usuario_log.tipousuario = data[0].tipousuario;

        registrarLog(req.body.idusuario, data[0].tipousuario, data[0].nombreusuario, "Login", "Login exitoso", "Exitoso", new Date());

        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(other);

    });

};

export const logout = (req, res) => {
    registrarLog(usuario_log.idusuario, usuario_log.tipousuario, usuario_log.nombreusuario, "Logout", "Logout exitoso", "Exitoso", new Date());
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
    }).status(200).json("Sesion cerrada con exito");
}