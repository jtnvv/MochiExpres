import express from 'express';
import { deleteEnvio, getEnviosCliente, getEnvios, updateEnvioEstado, updateEnvioRepartidor } from '../controllers/envio.js';

const router = express.Router();

router.get("/getEnvios", getEnvios);
router.get("/getEnviosCliente/:idCliente", getEnviosCliente);
router.delete("/deleteEnviosCliente/:idCliente", deleteEnvio);
router.post("/updateEnvioEstado", updateEnvioEstado);
router.post("/updateEnvioRepartidor", updateEnvioRepartidor);


export default router;