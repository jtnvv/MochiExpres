import express from 'express';
import { deleteSolicitudEnvio } from '../controllers/solicitudenvio.js';

const router = express.Router();

router.delete("/deleteSolicitudesCliente/:idCliente", deleteSolicitudEnvio);

export default router;