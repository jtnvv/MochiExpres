import express from 'express';
import {updateuser, getuser, updatepass, checkpass} from '../controllers/usuario.js';

const router = express.Router();

router.post("/update", updateuser);
router.post("/getuser", getuser);
router.post("/updatepass", updatepass);
router.post("/checkpass", checkpass);

export default router