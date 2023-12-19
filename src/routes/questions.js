import express from 'express';
import {GET_ALL_QUESTIONS, POST_QUESTION, DELETE_QUESTION} from '../controllers/questions.js';

const router = express.Router();


router.get("/questions", GET_ALL_QUESTIONS);
router.post("/question", POST_QUESTION);
router.delete("/question/:id", DELETE_QUESTION);

export default router;