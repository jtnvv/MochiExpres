    import {db}  from '../db.js';
    import bcrypt from 'bcryptjs';
    import jwt from 'jsonwebtoken';
    // const db = require('../db.js');
    import bcrypt from 'bcrypt';
    import jwt from 'jsonwebtoken';
    
    export const recoverPassword1= (req, res) => {
        const {usuario, numeroIdentidad } = req.body;
    
        // Verificar que la cuenta exista
        const q = "select * from (select idCliente as idusuario, nombrecliente as nombreusuario, correocliente as correousuario, direccioncliente as direccionusuario, telefonocliente as telefonousuario, contrasenacliente as contrasenausuario, identificadorpregcliente as identificadorpregusuario, respuestapregcliente as respuestapregusuario, tipousuario from cliente union select idadministrador as idusuario, nombreadministrador as nombreusuario, correoadministrador as correousuario, direccionadministrador as direccionusuario, telefonoadministrador as telefonousuario, contrasenaadministrador as contrasenausuario, identificadorpregadmin as identificadorpregusuario, respuestapregadmin as respuestapregusuario, tipousuario from administrador union select idrepartidor as idusuario, nombrerepartidor as nombreusuario, correorepartidor as correousuario, direccionrepartidor as direccionusuario, telefonorepartidor as telefonousuario, contrasenarepartidor as contrasenausuario, identificadorpregrepar as identificadorpregusuario, respuestapregrepar as respuestapregusuario, tipousuario from repartidor) as usuarios where idusuario = ? AND nombreusuario = '";
    
        db.query(q,[req.body.idusuario, req.body.nombreusuario], (err,data)=>{
            if (err) return res.json(err);
            if(data.length === 0) return res.status(404).json("Usuario no encontrado");
            
        });

    };
    

    
