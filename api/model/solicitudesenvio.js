import express from 'express';
import { deleteSolicitudEnvio, getSolicitudesEnvio, getSolicitudId } from '../controllers/solicitudenvio.js';

const router = express.Router();

router.get("/getSolicitudesEnvio", getSolicitudesEnvio);
router.get("/getSolicitudId/:idsolicitudenvio", getSolicitudId);
router.delete("/deleteSolicitudesCliente/:idCliente", deleteSolicitudEnvio);
export default router;