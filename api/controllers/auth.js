import { db } from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import CryptoJS from 'crypto-js';

export const key = {
    key: "Mochi",
};

import { registrarLog, registrarOperacion } from './auditoria.js';
// const db = require('../db.js');
// Función para cifrar la contraseña
export const encryptData = (data) => {

    // Ciframos la contraseña con la clave secreta
    const ciphertext = CryptoJS.AES.encrypt(data, key.key);
  
    // Devolvemos la clave secreta y el cifrado en formato string
    return {
      key: key.toString(),
      ciphertext: ciphertext.toString()
    };
  }
  
  // Función para descifrar la contraseña
  export const decryptData = (encryptedData) => {
    if (typeof encryptedData !== 'string' || !encryptedData) {
        console.log('Invalid encrypted data');
        return null;
    }

    const bytes = CryptoJS.AES.decrypt(encryptedData, key.key).toString(CryptoJS.enc.Utf8);
    console.log(bytes);
    return bytes;
}

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
        if (err) {
            registrarOperacion("Cliente no registrado", "Desconocido","Desconocido", "CREATE", "Cliente", req.body.idCliente, "Error en conexión con la base de datos", "Fallido", new Date(), res);
            return res.status(500).json(err)
        };
        //console.log(err);
        if (data.length) {
            registrarOperacion("Cliente", req.body.idCliente, data[0].nombrecliente, "CREATE", "Cliente", req.body.idCliente, "El usuario ya esta registrado", "Fallido", new Date(), res);
            return res.status(409).json("El usuario ya esta registrado")
        };

        //Encriptar contraseña

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.contrasenacliente, salt);

        //Encriptar correo 
        const correo = encryptData(req.body.correocliente).ciphertext;

        //Encriptar direccion
        const direccion = encryptData(req.body.direccioncliente).ciphertext;

        //Encriptar telefono
        const telefono = encryptData(req.body.telefonocliente).ciphertext;

        //Encriptar respuesta
        const respuesta = encryptData(req.body.respuestapregcliente).ciphertext;

        const q = "INSERT INTO cliente(`idCliente`,`nombrecliente`,`correocliente`,`direccioncliente`,`telefonocliente`,`contrasenacliente`,`identificadorpregcliente`,`respuestapregcliente`) values (?)";

        const values = [
            req.body.idCliente,
            req.body.nombrecliente,
            correo,
            direccion,
            telefono,
            hash,
            req.body.identificadorpregcliente,
            respuesta,
        ]

        db.query(q, [values], (err, data) => {
            if (err) {
                registrarOperacion("Cliente", req.body.idCliente ,req.body.nombrecliente, "CREATE", "Cliente no registrado", req.body.idCliente, "Error en la inserción del cliente", "Fallido", new Date(), res);
                return res.json(err)
            };
            registrarOperacion("Cliente", req.body.idCliente, req.body.nombrecliente, "CREATE", "Cliente", req.body.idCliente, "Cliente registrado con exito", "Exitoso", new Date(), res);
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
            registrarLog("No determinado","Desconocido", "Desconocido", "Login", "Error en conexión con la base de datos","Fallido", new Date(), res);
            return res.status(500).json("Ha pasado algo al conectar con la base de datos");
        }
        if (data.length === 0) {
            registrarLog("No determinado","Desconocido", "Desconocido", "Login", "El usuario no fue encontrado", "Fallido", new Date(), res);
            return res.status(404).json("¡Usuario no encontrado!")
        };

        //Verificación de contrasena
        const isPasswordCorrect = bcrypt.compareSync(req.body.contrasenausuario, data[0].contrasenausuario);

        if (!isPasswordCorrect) {
            registrarLog(data[0].tipousuario, data[0].idusuario ,data[0].nombreusuario, "Login", "Contraseña incorrecta", "Fallido", new Date(), res);
            return res.status(400).json("¡Contraseña incorrecta!");
        };

        const token = jwt.sign({ id: data[0].idusuario }, "jwtkey");
        const { contrasenausuario, ...other } = data[0];

        const correo = decryptData(data[0].correousuario);
        const direccion = decryptData(data[0].direccionusuario);
        const telefono = decryptData(data[0].telefonousuario);
        const respuesta = decryptData(data[0].respuestapregusuario); 

        usuario_log.idusuario = data[0].idusuario;
        usuario_log.nombreusuario = data[0].nombreusuario;
        usuario_log.contrasenausuario = data[0].contrasenausuario;
        usuario_log.correousuario = correo;
        usuario_log.direccionusuario = direccion;
        usuario_log.telefonousuario = telefono;
        usuario_log.contrasenausuario = data[0].contrasenausuario;
        usuario_log.identificadorpregusuario = data[0].identificadorpregusuario;
        usuario_log.respuestapregusuario = respuesta;
        usuario_log.tipousuario = data[0].tipousuario;

        console.log(usuario_log);

        registrarLog(data[0].tipousuario, data[0].idusuario, data[0].nombreusuario, "Login", "Login exitoso", "Exitoso", new Date(), res);

        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(usuario_log);

    });

};

export const logout = (req, res) => {
    registrarLog(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario, "Logout", "Logout exitoso", "Exitoso", new Date(), res);
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
    }).status(200).json("Sesion cerrada con exito");
}