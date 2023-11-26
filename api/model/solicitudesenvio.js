import express from 'express';
import { deleteSolicitudEnvio, getSolicitudesEnvio, getSolicitudId, createSolEnvio, getSolicitudIdCliente, deleteSolEnvCliente } from '../controllers/solicitudenvio.js';

const router = express.Router();


router.get("/getSolicitudesEnvio", getSolicitudesEnvio);
router.get("/getSolicitudId/:idsolicitudenvio", getSolicitudId);
router.delete("/deleteSolicitudesCliente/:idCliente", deleteSolicitudEnvio);
router.get("/getSolicitudIdCliente/:idCliente", getSolicitudIdCliente); //solicitudes que tiene asignadas cada cliente
router.post("/createSolEnvio", createSolEnvio);
router.delete("/deleteSolEnvCliente/:idsolicitudenvio", deleteSolEnvCliente);
export default router;