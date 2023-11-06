import express from 'express';
//import { paginaInicio } from '../controllers/repartidor.js';
import { getRepartidores, registerRepartidores, deleteRepartidor } from '../controllers/repartidor.js';


const router = express.Router();

//router.get("/hola", paginaInicio);
router.get("/getRepartidores", getRepartidores);
router.post("/register", registerRepartidores);
router.delete("/deleteRepartidor", deleteRepartidor);


export default router