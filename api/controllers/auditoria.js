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


