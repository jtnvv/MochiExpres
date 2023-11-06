import express from 'express';
import { getClientes, deleteCliente } from '../controllers/cliente.js';

const router = express.Router();

router.get("/getClientes", getClientes);
router.delete("/deleteCliente/:idCliente", deleteCliente);

export default router;