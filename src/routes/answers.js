import express from 'express';
import {GET_QUESTION_ANSWERS, POST_QUESTION_ANSWER, DELETE_ANSWER} from '../controllers/answers.js';

const router = express.Router();

router.get("/question/:id/answers", GET_QUESTION_ANSWERS);
router.post("/question/:id/answers", POST_QUESTION_ANSWER);
router.delete("/answer/:id", DELETE_ANSWER);

export default router;