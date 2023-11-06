import express from 'express';
import { deleteEnvio } from '../controllers/envio.js';

const router = express.Router();

router.delete("/deleteEnviosCliente/:idCliente", deleteEnvio);

export default router;