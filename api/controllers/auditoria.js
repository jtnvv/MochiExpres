import { db } from '../db.js';

export const registrarLog = (aud_id, aud_tipousuario, aud_nombreusuario, aud_tipolog,aud_detalle, aud_resultado, aud_fecha) => {
    const q = "INSERT INTO auditoria_log (`aud_id`,`aud_tipousuario`,`aud_nombreusuario`,`aud_tipolog`,`aud_detalle`,`aud_resultado`,`aud_fecha`) values (?)";

    console.log("Comienzo de auditoria");

    db.query(q, [aud_id, aud_tipousuario, aud_nombreusuario, aud_tipolog, aud_detalle, aud_resultado, aud_fecha], (err, data) => {
        if (err) return res.status(500).json(err);
        console.log(err);
        return res.status(200).json("Auditoria registrada con exito");
    });
};

export const registrarOperacion = (aud_id, aud_tipousuario, aud_nombreusuario, aud_accion, aud_archivo, aud_idobjeto, aud_detalle, aud_resultado, aud_fecha) => {
    const q = "INSERT INTO auditoria_operaciones (`aud_id`,`aud_tipousuario`,`aud_nombreusuario`,`aud_accion`,`aud_archivo`,`aud_idobjeto`,`aud_detalle`,`aud_resultado`,`aud_fecha`) values (?)";

    console.log("Comienzo de auditoria");

    db.query(q, [aud_id, aud_tipousuario, aud_nombreusuario, aud_accion, aud_archivo, aud_idobjeto, aud_detalle, aud_resultado, aud_fecha], (err, data) => {
        if (err) return res.status(500).json(err);
        console.log(err);
        return res.status(200).json("Auditoria registrada con exito");
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


