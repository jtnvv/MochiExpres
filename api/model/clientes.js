import express from 'express';
import { addCliente, paginaInicio } from '../controllers/cliente.js';

const router = express.Router();

router.get("/test", addCliente);
router.get("/hola", paginaInicio);

export default router;