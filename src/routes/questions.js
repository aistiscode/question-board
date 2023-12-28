import express from 'express';
import {GET_ALL_QUESTIONS, GET_QUESTION_BY_ID, POST_QUESTION, DELETE_QUESTION, LIKE_QUESTION, DISLIKE_QUESTION} from '../controllers/questions.js';
import AUTHENTICATE_USER from '../middleware/authentication.js';

const router = express.Router();


router.get("/questions", GET_ALL_QUESTIONS);
router.get("question/:question_id", GET_QUESTION_BY_ID);
router.post("/question", AUTHENTICATE_USER, POST_QUESTION);
router.delete("/question/:question_id", DELETE_QUESTION);

router.post("/question/:question_id/like", AUTHENTICATE_USER, LIKE_QUESTION);
router.post("/question/:question_id/dislike", AUTHENTICATE_USER, DISLIKE_QUESTION);

export default router;