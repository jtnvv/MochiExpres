import express from 'express';
//import { paginaInicio } from '../controllers/repartidor.js';
import { getRepartidores, registerRepartidores } from '../controllers/repartidor.js';


const router = express.Router();

//router.get("/hola", paginaInicio);
router.get("/getRepartidores", getRepartidores);
router.post("/register", registerRepartidores);


export default router