import { db } from '../db.js';
import bcrypt from 'bcryptjs';
import CryptoJS from 'crypto-js';
import { registrarOperacion } from './auditoria.js';
import { decryptData } from './auth.js';

// const db = require('../db.js');

const usuario_mod = {
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

export const recoverPassword1 = (req, res) => {
    // const {usuario, numeroIdentidad } = req.body;

    // Verificar que la cuenta exista
    const q = "select * from (select idCliente as idusuario, nombrecliente as nombreusuario, correocliente as correousuario, direccioncliente as direccionusuario, telefonocliente as telefonousuario, contrasenacliente as contrasenausuario, identificadorpregcliente as identificadorpregusuario, respuestapregcliente as respuestapregusuario, tipousuario from cliente union select idadministrador as idusuario, nombreadministrador as nombreusuario, correoadministrador as correousuario, direccionadministrador as direccionusuario, telefonoadministrador as telefonousuario, contrasenaadministrador as contrasenausuario, identificadorpregadmin as identificadorpregusuario, respuestapregadmin as respuestapregusuario, tipousuario from administrador union select idrepartidor as idusuario, nombrerepartidor as nombreusuario, correorepartidor as correousuario, direccionrepartidor as direccionusuario, telefonorepartidor as telefonousuario, contrasenarepartidor as contrasenausuario, identificadorpregrepar as identificadorpregusuario, respuestapregrepar as respuestapregusuario, tipousuario from repartidor) as usuarios where idusuario = ? and nombreusuario = ?";


    db.query(q, [req.body.idusuario, req.body.nombreusuario], (err, data) => {
        if (err) {
            console.log("Ha pasado algo ", err);
            registrarOperacion("No determinado", "Desconocido","Desconocido","GET", "Cliente,Administrador,Repartidor", req.body.idusuario, "Recuperación de contraseña Paso 1 Falla: Error en conexión con base de datos", "Fallido", new Date(), res);
            return res.status(500).json(err);
        };
        if (data.length === 0) {
            registrarOperacion("No determinado","Desconocido", "Desconocido","GET", "Cliente,Administrador,Repartidor", req.body.idusuario, "Recuperación de contraseña Paso 1 Falla: Usuario no encontrado", "Fallido", new Date(), res);
            return res.status(404).json("Usuario no encontrado");
            //Manejar el error
        } else {
            console.log("Usuario encontrado");
            console.log(data[0]);
            usuario_mod.idusuario = data[0].idusuario;
            usuario_mod.nombreusuario = data[0].nombreusuario;
            usuario_mod.correousuario = decryptData(data[0].correousuario);
            usuario_mod.direccionusuario = decryptData(data[0].direccionusuario);
            usuario_mod.telefonousuario = decryptData(data[0].telefonousuario);
            usuario_mod.contrasenausuario = data[0].contrasenausuario;
            usuario_mod.identificadorpregusuario = data[0];
            usuario_mod.respuestapregusuario = decryptData(data[0].respuestapregusuario);
            usuario_mod.tipousuario = data[0].tipousuario;
            registrarOperacion(data[0].tipousuario, data[0].idusuario, data[0].nombreusuario,"GET", "Cliente,Administrador,Repartidor", req.body.idusuario, "Recuperación de contraseña Paso 1: Usuario Encontrado, Exitosa", "Exitoso", new Date(), res);
            return res.status(200).json(data[0]);
        }
    });

    // db.query(q, [req.body.idusuario], (err, data) => {
    //     if (err) return res.status(500).json("Ha pasado algo ", err);
    //     if (data.length === 0) return res.status(404).json("¡Usuario no encontrado!");

    //     //Verificación de contrasena
    //     const isPasswordCorrect = bcrypt.compareSync(req.body.contrasenausuario, data[0].contrasenausuario);

    //     if (!isPasswordCorrect) return res.status(400).json("¡Contraseña incorrecta!");

    //     const token = jwt.sign({ id: data[0].idusuario }, "jwtkey");
    //     const { contrasenausuario, ...other } = data[0];

    //     res.cookie("access_token", token, {
    //         httpOnly: true
    //     }).status(200).json(other);

    // });

};

export const recoverPassword2 = (req, res) => {
    const q = "select * from (select idCliente as idusuario, nombrecliente as nombreusuario, correocliente as correousuario, direccioncliente as direccionusuario, telefonocliente as telefonousuario, contrasenacliente as contrasenausuario, identificadorpregcliente as identificadorpregusuario, respuestapregcliente as respuestapregusuario, tipousuario from cliente union select idadministrador as idusuario, nombreadministrador as nombreusuario, correoadministrador as correousuario, direccionadministrador as direccionusuario, telefonoadministrador as telefonousuario, contrasenaadministrador as contrasenausuario, identificadorpregadmin as identificadorpregusuario, respuestapregadmin as respuestapregusuario, tipousuario from administrador union select idrepartidor as idusuario, nombrerepartidor as nombreusuario, correorepartidor as correousuario, direccionrepartidor as direccionusuario, telefonorepartidor as telefonousuario, contrasenarepartidor as contrasenausuario, identificadorpregrepar as identificadorpregusuario, respuestapregrepar as respuestapregusuario, tipousuario from repartidor) as usuarios where idusuario = ?";

    db.query(q, [req.body.idusuario], (err, data) => {
        if (err) {
            registrarOperacion("No determinado", "Desconocido", "Desconocido","GET", "Cliente,Administrador,Repartidor", req.body.idusuario, "Recuperación de contraseña Paso 2 Falla: Error en conexión con base de datos", "Fallido", new Date(), res);
            return res.status(500).json("Ha pasado algo ", err);
        };
        if (data.length === 0) {
            registrarOperacion("No determinado", "Desconocido", "Desconocido","GET", "Cliente,Administrador,Repartidor", req.body.idusuario, "Recuperación de contraseña Paso 2 Falla: Usuario no encontrado", "Fallido", new Date(), res);
            return res.status(404).json("¡Usuario no encontrado!");
        }

        const respuestaIn = req.body.respuestapregusuario;
        console.log(respuestaIn);
        const respuestaBd = decryptData(data[0].respuestapregusuario);
        console.log(respuestaBd);

        if (respuestaIn === respuestaBd) {
            console.log("Respuesta correcta");
            registrarOperacion(data[0].tipousuario, data[0].idusuario, data[0].nombreusuario,"GET", "Cliente,Administrador,Repartidor", req.body.idusuario, "Recuperación de contraseña Paso 2: Identidad validada, Exitosa", "Exitoso", new Date(), res);
            return res.status(200).json(data[0]);
        } else {
            registrarOperacion(data[0].tipousuario, data[0].idusuario, data[0].nombreusuario,"GET", "Cliente,Administrador,Repartidor", req.body.idusuario, "Recuperación de contraseña Paso 2 Falla: Respuesta incorrecta", "Fallido", new Date(), res);
            return res.status(400).json("Respuesta incorrecta");
        }
    });
};


export const recoverPassword3 = (req, res) => {

    
    const salt = bcrypt.genSaltSync(10);
    

    const nueva_contrasena = req.body.nuevacontrasenausuario;
    const antigua_contrasena = req.body.contrasenausuario;
    const tipo_usuario = req.body.tipousuario;

    const query_cliente= "UPDATE cliente SET contrasenacliente = ? WHERE idCliente = ?";

    const query_administrador= "UPDATE administrador SET contrasenaadministrador = ? WHERE idadministrador = ?";

    const query_repartidor= "UPDATE repartidor SET contrasenarepartidor = ? WHERE idrepartidor = ?";

    const hash_nueva = bcrypt.hashSync(nueva_contrasena, salt);
    const hash_antigua = bcrypt.hashSync(antigua_contrasena, salt);

    if (!(hash_antigua === usuario_mod.contrasenausuario)) {
        console.log(nueva_contrasena);
        if(tipo_usuario === "cliente"){
            db.query(query_cliente, [hash_nueva, req.body.idusuario], (err, data) => {
                if (err) {
                    registrarOperacion(tipo_usuario, req.body.idusuario, req.body.nombreusuario,"UPDATE", tipo_usuario, req.body.idusuario, "Recuperación de contraseña Paso 3 Falla: Error en conexión con base de datos", "Fallido", new Date(), res);
                    return res.json(err);
                };
                console.log(data[0]);
                registrarOperacion(tipo_usuario, req.body.idusuario, req.body.nombreusuario,"UPDATE", tipo_usuario, req.body.idusuario, "Recuperación de contraseña Paso 3: Contraseña modificada, Exitosa", "Exitoso", new Date(), res);
                return res.status(200).json("Contraseña actualizada con exito");
            });
        }else if(tipo_usuario === "administrador"){
            db.query(query_administrador, [hash_nueva, req.body.idusuario], (err, data) => {
                if (err) {
                    registrarOperacion(tipo_usuario, req.body.idusuario, req.body.nombreusuario,"UPDATE", tipo_usuario, req.body.idusuario, "Recuperación de contraseña Paso 3 Falla: Error en conexión con base de datos", "Fallido", new Date(), res);
                    return res.json(err);
                }
                console.log(data[0]);
                registrarOperacion(tipo_usuario, req.body.idusuario, req.body.nombreusuario,"UPDATE", tipo_usuario, req.body.idusuario, "Recuperación de contraseña Paso 3: Contraseña modificada Exitosa", "Exitoso", new Date(), res);
                return res.status(200).json("Contraseña actualizada con exito");
            });
        }else{
            db.query(query_repartidor, [hash_nueva, req.body.idusuario], (err, data) => {
                if (err) {
                    registrarOperacion(tipo_usuario, req.body.idusuario, req.body.nombreusuario,"UPDATE", tipo_usuario, req.body.idusuario, "Recuperación de contraseña Paso 3 Falla: Error en conexión con base de datos", "Fallido", new Date(), res);
                    return res.json(err);
                }
                console.log(data[0]);
                registrarOperacion(tipo_usuario, req.body.idusuario, req.body.nombreusuario,"UPDATE", tipo_usuario, req.body.idusuario, "Recuperación de contraseña Paso 3: Contraseña modificada Exitosa", "Exitoso", new Date(), res);
                return res.status(200).json("Contraseña actualizada con exito");
            });
        }
    }
    else {
        registrarOperacion(tipo_usuario, req.body.idusuario, req.body.nombreusuario,"UPDATE", tipo_usuario, req.body.idusuario, "Recuperación de contraseña Paso 3 Falla: La nueva contraseña no puede ser igual a la anterior", "Fallido", new Date(), res);
        return res.status(400).json("La nueva contraseña no puede ser igual a la anterior");
    }

};


