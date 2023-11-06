import express from 'express';
import { deleteSolicitudEnvio, getSolicitudesEnvio } from '../controllers/solicitudenvio.js';

const router = express.Router();

router.get("/getSolicitudesEnvio", getSolicitudesEnvio);
router.delete("/deleteSolicitudesCliente/:idCliente", deleteSolicitudEnvio);

export default router;