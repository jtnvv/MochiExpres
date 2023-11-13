import express from 'express';
import { getClientes, deleteCliente, getClienteId, getClienteSolId} from '../controllers/cliente.js';

const router = express.Router();

router.get("/getClientes", getClientes);
router.delete("/deleteCliente/:idCliente", deleteCliente);
router.get("/getCliente/:idCliente", getClienteId);
router.get("/getClienteSol/:idsolicitudenvio", getClienteSolId);

export default router;