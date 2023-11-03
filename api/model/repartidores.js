import express from 'express';
import { paginaInicio } from '../controllers/repartidor.js';

const router = express.Router();

router.get("/hola", paginaInicio);

export default router