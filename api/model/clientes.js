import express from 'express';
import { getClientes } from '../controllers/cliente.js';

const router = express.Router();

router.get("/getClientes", getClientes);

export default router;