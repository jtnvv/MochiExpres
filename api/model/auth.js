import express from 'express';
import {login, logout, registerClients} from '../controllers/auth.js';

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/register", registerClients);

export default router;