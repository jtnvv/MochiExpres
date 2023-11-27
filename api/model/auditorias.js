import express from 'express';
import {getAuditoriaLog, getAuditoriaOperaciones} from '../controllers/auditoria.js';

const router = express.Router();

// router.post("/logout", logout);
router.get("/getAuditoriaLog", getAuditoriaLog);
router.get("/getAuditoriaOperaciones", getAuditoriaOperaciones);
////Enrutamiento para mostrar la tabla


export default router;