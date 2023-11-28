import express from 'express';
import { deleteEnvio, deleteEnvioId, getEnviosCliente, getEnviosRepartidor,  getEnvios, updateEnvioEstado, updateEnvioRepartidor, createEnvio } from '../controllers/envio.js';

const router = express.Router();

router.get("/getEnvios", getEnvios);
router.get("/getEnviosCliente/:idCliente", getEnviosCliente);
router.get("/getEnviosRepartidor/:idRepartidor", getEnviosRepartidor);
router.delete("/deleteEnviosCliente/:idCliente", deleteEnvio);
router.delete("/deleteEnvioId/:idenvio", deleteEnvioId);
router.post("/updateEnvioEstado", updateEnvioEstado);
router.post("/updateEnvioRepartidor", updateEnvioRepartidor);
router.post("/createEnvio", createEnvio);


export default router;