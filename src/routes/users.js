import express from 'express';

import {REGISTER, LOGIN} from '../controllers/users.js'

const router = express.Router();

router.post("/users", REGISTER);
router.post("/users/login", LOGIN);

export default router;