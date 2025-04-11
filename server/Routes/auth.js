import express from 'express';
import {reg,login} from '../controllers/controller.js'


const router = express.Router();

router.post("/reg", reg);
router.post("/login", login);

export default router;
