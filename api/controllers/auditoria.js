import { db } from '../db.js';
import { retornarFecha } from './retornarFecha.js';

export const registrarLog = (aud_tipousuario, aud_nombreusuario, aud_tipolog,aud_detalle, aud_resultado, aud_fecha, res) => {
    const q = "INSERT INTO auditoria_log (`aud_tipousuario`,`aud_nombreusuario`,`aud_tipolog`,`aud_detalle`,`aud_resultado`,`aud_fecha`) values (?)";
    //let fecha = retornarFecha(aud_fecha);
    console.log("Comienzo de auditoria");
    const valores = [[aud_tipousuario, aud_nombreusuario, aud_tipolog, aud_detalle, aud_resultado, aud_fecha]];

    db.query(q, valores, (err, data) => {
        console.log(valores);
        if (err) {
            console.log(err);
        } else {
            console.log("Auditoria registrada con exito");
        }
    });
};

export const registrarOperacion = (aud_tipousuario, aud_nombreusuario, aud_accion, aud_archivo, aud_idobjeto, aud_detalle, aud_resultado, aud_fecha, res) => {
    const q = "INSERT INTO auditoria_operaciones (`aud_tipousuario`,`aud_nombreusuario`,`aud_accion`,`aud_archivo`,`aud_idobjeto`,`aud_detalle`,`aud_resultado`,`aud_fecha`) values (?)";
    //let fecha = retornarFecha(aud_fecha);
    console.log("Comienzo de auditoria");
    const valores = [[aud_tipousuario, aud_nombreusuario, aud_accion, aud_archivo, aud_idobjeto, aud_detalle, aud_resultado, aud_fecha]];
    db.query(q, valores, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Auditoria registrada con exito");
        }
        
    });
};

export const getAuditoriaLog = (req, res) => {
    const q = "SELECT * FROM auditoria_log";
    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        console.log(err);
        if (data.length == 0) return res.status(409).json("No hay auditorias registradas");
        return res.status(200).json(data);
    });
};

export const getAuditoriaOperaciones = (req, res) => {
    const q = "SELECT * FROM auditoria_operaciones";
    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        console.log(err);
        if (data.length == 0) return res.status(409).json("No hay auditorias registradas");
        return res.status(200).json(data);
    });
};


