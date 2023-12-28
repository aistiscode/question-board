import express from 'express';
import AUTHENTICATE_USER from '../middleware/authentication.js';
import {GET_QUESTION_ANSWERS, POST_QUESTION_ANSWER, DELETE_ANSWER, LIKE_ANSWER, DISLIKE_ANSWER} from '../controllers/answers.js';

const router = express.Router();

router.get("/question/:question_id/answers", GET_QUESTION_ANSWERS);
router.post("/question/:question_id/answers", POST_QUESTION_ANSWER);
router.delete("/answer/:answer_id", DELETE_ANSWER);

router.post("/answer/:answer_id/like", AUTHENTICATE_USER, LIKE_ANSWER);
router.post("/answer/:answer_id/dislike", AUTHENTICATE_USER, DISLIKE_ANSWER);

export default router;