import express from 'express';
import { getClientes, deleteCliente, getClienteId} from '../controllers/cliente.js';

const router = express.Router();

router.get("/getClientes", getClientes);
router.delete("/deleteCliente/:idCliente", deleteCliente);
router.get("/getCliente/:idCliente", getClienteId);

export default router;