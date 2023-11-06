import express from 'express';
import { deleteEnvio, getEnviosCliente } from '../controllers/envio.js';

const router = express.Router();

router.get("/getEnviosCliente/:idCliente", getEnviosCliente);
router.delete("/deleteEnviosCliente/:idCliente", deleteEnvio);

export default router;