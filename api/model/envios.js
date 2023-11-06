import express from 'express';
import { deleteEnvio, getEnviosCliente, getEnvios } from '../controllers/envio.js';

const router = express.Router();

router.get("/getEnvios", getEnvios);
router.get("/getEnviosCliente/:idCliente", getEnviosCliente);
router.delete("/deleteEnviosCliente/:idCliente", deleteEnvio);

export default router;