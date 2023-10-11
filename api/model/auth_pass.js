import express from 'express';
import {recoverPassword1, recoverPassword2, recoverPassword3} from '../controllers/auth_pass.js';

const router = express.Router();

router.post("/auth_recov1", recoverPassword1);
router.post("/auth_recov2", recoverPassword2);
router.post("/auth_recov3", recoverPassword3);

export default router;