import express from 'express';
//import { paginaInicio } from '../controllers/repartidor.js';
import { getRepartidores } from '../controllers/repartidor.js';


const router = express.Router();

//router.get("/hola", paginaInicio);
router.get("/getRepartidores", getRepartidores);


export default router