import { db } from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { usuario_log } from './auth.js';
import { registrarOperacion } from './auditoria.js';
import {decryptData} from './auth.js';

export const getRepartidores = (req, res) => {
    const q = "SELECT * FROM repartidor";

    console.log("Entro");

    db.query(q, (err, data) => {
        if(err) {
            registrarOperacion(usuario_log.tipousuario,usuario_log.idusuario,usuario_log.nombreusuario,"GET","Repartidor","Tabla de repartidores","Error en conexión con la base de datos","Fallido",new Date(),res);
            return res.status(500).json(err);
        }
        //console.log(err);
        if(data.length == 0) {
            registrarOperacion(usuario_log.tipousuario,usuario_log.idusuario,usuario_log.nombreusuario,"GET","Repartidor","Tabla de repartidores","No hay repartidores registrados","Fallido",new Date(),res);
            return res.status(409).json("No hay repartidores registrados");
        }
        registrarOperacion(usuario_log.tipousuario,usuario_log.idusuario,usuario_log.nombreusuario,"GET","Repartidor","Tabla de repartidores","Consulta de repartidores exitosa","Exitoso",new Date(),res);
        
        datosDesencriptados = data.map((repartidor) => {
            return{
                ...repartidor,
                correorepartidor: decryptData(repartidor.correorepartidor),
                direccionrepartidor: decryptData(repartidor.direccionrepartidor),
                telefonorepartidor: decryptData(repartidor.telefonorepartidor),
                respuestapregrepar: decryptData(repartidor.respuestapregrepar)
            };
        });

        let respuesta = res.status(200).json(datosDesencriptados);
        //console.log(respuesta);
        return respuesta; 
    });
}

export const getRepartidorId = (req, res) => {
    const q = "SELECT * FROM repartidor WHERE idrepartidor = ?";

    db.query(q, [req.params.idrepartidor], (err, data) => {
        if (err) {
            registrarOperacion(usuario_log.tipousuario,usuario_log.idusuario,usuario_log.nombreusuario,"GET","Repartidor",req.params.idrepartidor,"Error en conexión con la base de datos","Fallido",new Date(),res);
            return res.status(500).json(err);
        }
        //console.log(err);
        if (data.length == 0) {
            registrarOperacion(usuario_log.tipousuario,usuario_log.idusuario,usuario_log.nombreusuario,"GET","Repartidor",req.params.idrepartidor,`El repartidor con identificador ${req.params.idrepartidor} no se encuentra registrado`,"Fallido",new Date(),res);
            return res.json("El repartidor no se encuentra registrado");
        }
        registrarOperacion(usuario_log.tipousuario,usuario_log.idusuario,usuario_log.nombreusuario,"GET","Repartidor",req.params.idrepartidor,`Consulta de repartidor con identificación ${req.params.idrepartidor} exitosa`,"Exitoso",new Date(),res);
        
        data[0].correorepartidor = decryptData(data[0].correorepartidor);
        data[0].direccionrepartidor = decryptData(data[0].direccionrepartidor);
        data[0].telefonorepartidor = decryptData(data[0].telefonorepartidor);
        data[0].respuestapregrepar = decryptData(data[0].respuestapregrepar);
        
        let respuesta = res.status(200).json(data[0]);
        //console.log(respuesta);
        return respuesta;
    });
}

export const registerRepartidores = (req, res) => {
        //Verificar si el usuario ya existe
        const q = "SELECT * FROM repartidor WHERE idRepartidor = ?";
        console.log("Entro")
        console.log(req.body);
        //console.log
        db.query(q, [req.body.idrepartidor], (err, data) => {
            if (err) {
                registrarOperacion(usuario_log.tipousuario,usuario_log.idusuario,usuario_log.nombreusuario,"CREATE","Repartidor","Desconocido","Error en conexión con la base de datos","Fallido",new Date(),res);
                return res.status(500).json(err);
            }
            //console.log(err);
            if (data.length) {
                registrarOperacion(usuario_log.tipousuario,usuario_log.idusuario,usuario_log.nombreusuario,"CREATE","Repartidor",req.body.idrepartidor,`El repartidor con identificación ${req.body.idrepartidor} ya esta registrado`,"Fallido",new Date(),res);
                return res.status(409).json("El registrador ya esta registrado");
            }
            //Encriptar contraseña
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.contrasenarepartidor, salt);
            const q = "INSERT INTO repartidor(`idrepartidor`,`nombrerepartidor`,`correorepartidor`,`direccionrepartidor`,`telefonorepartidor`,`contrasenarepartidor`,`identificadorpregrepar`,`respuestapregrepar`) values (?)";
            const values = [
                req.body.idrepartidor,
                req.body.nombrerepartidor,
                decryptData(req.body.correorepartidor),
                decryptData(req.body.direccionrepartidor),
                decryptData(req.body.telefonorepartidor),
                hash,
                req.body.identificadorpregrepar,
                decryptData(req.body.respuestapregrepar),
            ]
    
            db.query(q, [values], (err, data) => {
                if (err) {
                    registrarOperacion(usuario_log.tipousuario,usuario_log.idusuario,usuario_log.nombreusuario,"CREATE","Repartidor","Desconocido","Error en la inserción del repartidor","Fallido",new Date(),res);
                    return res.json(err);
                }
                registrarOperacion(usuario_log.tipousuario,usuario_log.idusuario,usuario_log.nombreusuario,"CREATE","Repartidor",req.body.idrepartidor,`Repartidor con identificación ${req.body.idrepartidor} registrado con exito`,"Exitoso",new Date(),res);
                return res.status(200).json("Repartidor creado con exito");
            });
        });
}


export const deleteRepartidor = (req, res) => {
    const token = req.cookies.access_token;
    if(!token) {
        registrarOperacion(usuario_log.tipousuario,usuario_log.idusuario,usuario_log.nombreusuario,"DELETE","Repartidor","Desconocido","El usuario no cuenta con los permisos para realizar esta operación","Fallido",new Date(),res);
        return res.status(401).json("No estas autorizado");
    }
    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) {
            registrarOperacion(usuario_log.tipousuario,usuario_log.idusuario,usuario_log.nombreusuario,"DELETE","Repartidor","Desconocido","El usuario no cuenta con un Token válido para realizar esta operación","Fallido",new Date(),res);
            return res.status(403).json("Token is not valid!");
        }
        
        let repartidorId = req.params.idrepartidor;
        console.log("Aqui ", repartidorId);
        if (repartidorId === "") {
            registrarOperacion(usuario_log.tipousuario,usuario_log.idusuario,usuario_log.nombreusuario,"DELETE","Repartidor","Desconocido","No se ha enviado el id del repartidor","Fallido",new Date(),res);
            return res.status(403).json("No se ha enviado el id del repartidor");
        }

        const q = "DELETE FROM repartidor WHERE idrepartidor = ?";

        db.query(q, [repartidorId], (err, data) => {
            if (err) {
                registrarOperacion(usuario_log.tipousuario,usuario_log.idusuario,usuario_log.nombreusuario,"DELETE","Repartidor",repartidorId,"Error en conexión con la base de datos","Fallido",new Date(),res);
                return res.status(403).json("No puedes borrar este repartidor");
            }
            registrarOperacion(usuario_log.tipousuario,usuario_log.idusuario,usuario_log.nombreusuario,"DELETE","Repartidor",repartidorId,`Repartidor con identificación ${repartidorId} borrado con exito`,"Exitoso",new Date(),res);
            return res.status(200).json("Repartidor borrado con exito");
        });
    });
}