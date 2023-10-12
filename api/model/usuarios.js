import express from 'express';
import {updateuser, getuser} from '../controllers/usuario.js';

const router = express.Router();

router.post("/update", updateuser);
router.post("/getuser", getuser);

export default router