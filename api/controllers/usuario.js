import { db } from '../db.js';
import bcrypt from 'bcryptjs';
import { usuario_log } from './auth.js';
import { registrarOperacion } from './auditoria.js';
import {decryptData} from './auth.js';


export const updateuser = (req, res) => {

    const tipo_usuario = usuario_log.tipousuario;

    const query_cliente = "UPDATE cliente SET nombrecliente = ?, correocliente = ?, direccioncliente = ?, telefonocliente = ?, identificadorpregcliente = ?, respuestapregcliente = ? WHERE idCliente = ?";

    const query_administrador = "UPDATE administrador SET nombreadministrador = ?, correoadministrador = ?, direccionadministrador = ?, telefonoadministrador = ?, identificadorpregadministrador = ?, respuestapregadministrador = ? WHERE idadministrador = ?";

    const query_repartidor = "UPDATE repartidor SET nombrerepartidor = ?, correorepartidor = ?, direccionrepartidor = ?, telefonorepartidor = ?, identificadorpregrepartidor = ?, respuestapregrepartidor = ? WHERE idrepartidor = ?";

    const values = [
        req.body.nombreusuario,
        decryptData(req.body.correousuario),
        decryptData(req.body.direccionusuario),
        decryptData(req.body.telefonousuario),
        req.body.identificadorpregusuario,
        decryptData(req.body.respuestapregusuario),
        req.body.idusuario,
    ]

    if (tipo_usuario === "cliente") {

        db.query(query_cliente, values, (err, data) => {
            if (err) {
                registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario, "UPDATE", "Cliente", req.body.idusuario, "Error en conexión con la base de datos", "Fallido", new Date(), res);
                return res.json(err);
            }
            console.log(data[0]);
            registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario, "UPDATE", "Cliente", req.body.idusuario, `Actualización de cliente con identificador ${req.body.idusuario} exitosa`, "Exitoso", new Date(), res);
            return res.status(200).json("Cliente actualizado con exito");
        });
    } else if (tipo_usuario === "administrador") {

        db.query(query_administrador, values, (err, data) => {
            if (err) {
                registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario, "UPDATE", "Administrador", req.body.idusuario, "Error en conexión con la base de datos", "Fallido", new Date(), res);
                return res.json(err);
            }
            registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario, "UPDATE", "Administrador", req.body.idusuario, `Actualización de administrador con identificador ${req.body.idusuario} exitosa`, "Exitoso", new Date(), res);
            return res.status(200).json("Administrador actualizado con exito");
        });

    } else {

        db.query(query_repartidor, values, (err, data) => {
            if (err) {
                registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario, "UPDATE", "Repartidor", req.body.idusuario, "Error en conexión con la base de datos", "Fallido", new Date(), res);
                return res.json(err);
            }
            console.log(data[0]);
            registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario, "UPDATE", "Repartidor", req.body.idusuario, `Actualización de repartidor con identificador ${req.body.idusuario} exitosa`, "Exitoso", new Date(), res);
            return res.status(200).json("Repartidor actualizado con exito");
        });

    }

}


export const getuser = (req, res) => {

    const q = "select * from (select idCliente as idusuario, nombrecliente as nombreusuario, correocliente as correousuario, direccioncliente as direccionusuario, telefonocliente as telefonousuario, contrasenacliente as contrasenausuario, identificadorpregcliente as identificadorpregusuario, respuestapregcliente as respuestapregusuario, tipousuario from cliente union select idadministrador as idusuario, nombreadministrador as nombreusuario, correoadministrador as correousuario, direccionadministrador as direccionusuario, telefonoadministrador as telefonousuario, contrasenaadministrador as contrasenausuario, identificadorpregadmin as identificadorpregusuario, respuestapregadmin as respuestapregusuario, tipousuario from administrador union select idrepartidor as idusuario, nombrerepartidor as nombreusuario, correorepartidor as correousuario, direccionrepartidor as direccionusuario, telefonorepartidor as telefonousuario, contrasenarepartidor as contrasenausuario, identificadorpregrepar as identificadorpregusuario, respuestapregrepar as respuestapregusuario, tipousuario from repartidor) as usuarios where idusuario = ?";

    db.query(q, [req.body.idusuario], (err, data2) => {
        if (err) {
            registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario, "GET", "Usuario", req.body.idusuario, "Error en conexión con la base de datos", "Fallido", new Date(), res);
            return res.json(err);
        }
        console.log(data2[0]);
        registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario, "GET", "Usuario", req.body.idusuario, `Consulta de usuario con identificador ${req.body.idusuario} exitosa`, "Exitoso", new Date(), res);
        data2[0].correousuario = decryptData(data2[0].correousuario);
        data2[0].direccionusuario = decryptData(data2[0].direccionusuario);
        data2[0].telefonousuario = decryptData(data2[0].telefonousuario);
        data2[0].respuestapregusuario = decryptData(data2[0].respuestapregusuario);
        console.log(data2[0].correousuario);
        return res.status(200).json(data2[0]);
    });
}

export const updatepass = (req, res) => {

    const salt = bcrypt.genSaltSync(10);
    const nueva_contrasena = req.body.nuevacontrasenausuario;
    const antigua_contrasena = req.body.contrasenausuario;
    const id_usuario = req.body.idusuario;

    const tipo_usuario = usuario_log.tipousuario;

    const query_cliente = "UPDATE cliente SET contrasenacliente = ? WHERE idCliente = ?";
    const query_administrador = "UPDATE administrador SET contrasenaadministrador = ? WHERE idadministrador = ?";
    const query_repartidor = "UPDATE repartidor SET contrasenarepartidor = ? WHERE idrepartidor = ?";

    const hash_nueva = bcrypt.hashSync(nueva_contrasena, salt);
    const hash_antigua = bcrypt.hashSync(antigua_contrasena, salt);

    if (!(hash_antigua === hash_nueva)) {
        console.log(nueva_contrasena);
        if (tipo_usuario === "cliente") {
            db.query(query_cliente, [hash_nueva, req.body.idusuario], (err, data) => {
                if (err) {
                    registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario, "UPDATE", "Cliente", req.body.idusuario, "Error en conexión con la base de datos", "Fallido", new Date(), res);
                    return res.json(err);
                }
                console.log(data[0]);
                registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario, "UPDATE", "Cliente", req.body.idusuario, `Actualización de contraseña de cliente con identificador ${req.body.idusuario} exitosa`, "Exitoso", new Date(), res);
                return res.status(200).json("Contraseña actualizada con exito");
            });
        } else if (tipo_usuario === "administrador") {
            db.query(query_administrador, [hash_nueva, req.body.idusuario], (err, data) => {
                if (err) {
                    registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario, "UPDATE", "Administrador", req.body.idusuario, "Error en conexión con la base de datos", "Fallido", new Date(), res);
                    return res.json(err);
                }
                console.log(data[0]);
                registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario, "UPDATE", "Administrador", req.body.idusuario, `Actualización de contraseña de administrador con identificador ${req.body.idusuario} exitosa`, "Exitoso", new Date(), res);
                return res.status(200).json("Contraseña actualizada con exito");
            });
    
        } else {
            db.query(query_repartidor, [hash_nueva, req.body.idusuario], (err, data) => {
                if (err) {
                    registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario, "UPDATE", "Repartidor", req.body.idusuario, "Error en conexión con la base de datos", "Fallido", new Date(), res);
                    return res.json(err);
                }
                console.log(data[0]);
                registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario, "UPDATE", "Repartidor", req.body.idusuario, `Actualización de contraseña de repartidor con identificador ${req.body.idusuario} exitosa`, "Exitoso", new Date(), res);
                return res.status(200).json("Contraseña actualizada con exito");
            });
        }
    }else {
        registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario, "UPDATE", usuario_log.tipousuario, req.body.idusuario, `Cambio de contraseña fallido porque la nueva contraseña no puede ser igual a la anterior`, "Fallido", new Date(), res);
        return res.status(400).json("La nueva contraseña no puede ser igual a la anterior");
    }

}

export const checkpass = (req, res) => {
    const contrasena_verificar = req.body.contrasenausuario;
    const id_usuario = req.body.idusuario;
    const q = "select * from (select idCliente as idusuario, nombrecliente as nombreusuario, correocliente as correousuario, direccioncliente as direccionusuario, telefonocliente as telefonousuario, contrasenacliente as contrasenausuario, identificadorpregcliente as identificadorpregusuario, respuestapregcliente as respuestapregusuario, tipousuario from cliente union select idadministrador as idusuario, nombreadministrador as nombreusuario, correoadministrador as correousuario, direccionadministrador as direccionusuario, telefonoadministrador as telefonousuario, contrasenaadministrador as contrasenausuario, identificadorpregadmin as identificadorpregusuario, respuestapregadmin as respuestapregusuario, tipousuario from administrador union select idrepartidor as idusuario, nombrerepartidor as nombreusuario, correorepartidor as correousuario, direccionrepartidor as direccionusuario, telefonorepartidor as telefonousuario, contrasenarepartidor as contrasenausuario, identificadorpregrepar as identificadorpregusuario, respuestapregrepar as respuestapregusuario, tipousuario from repartidor) as usuarios where idusuario = ? and contrasenausuario = ?";

    db.query(q, [id_usuario, contrasena_verificar], (err, data) => {
        if (err) {
            registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario, "GET", usuario_log.tipousuario, id_usuario, "Error en conexión con la base de datos", "Fallido", new Date(), res);
            return res.json(err);
        }
        if(data.length === 0){
            registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario, "GET", usuario_log.tipousuario, id_usuario, `Verificación de contraseña de ${usuario_log.nombreusuario} con identificador ${id_usuario} fallida`, "Fallido", new Date(), res);
            return false;
        }else{
            registrarOperacion(usuario_log.tipousuario, usuario_log.idusuario, usuario_log.nombreusuario, "GET", usuario_log.tipousuario, id_usuario, `Verificación de contraseña de ${usuario_log.nombreusuario} con identificador ${id_usuario} exitosa`, "Exitoso", new Date(), res);
            return true;
        }
    });
}
