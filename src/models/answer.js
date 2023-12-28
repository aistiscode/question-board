import mongoose from "mongoose";
import questionModel from "../models/question.js";

const answerSchema = mongoose.Schema({
    "answer_text": {type: String, required: true},
    "answer_id": {type: String, required: false},
    "question_id": { type: String, ref: 'questionModel', required: false },
    "likes": [{type: String, ref:'User'}],
   /*
    "user_id": {type: String, required: true}
    "date": {type: String, required: true},
    "gained_likes_number": {type: String, required: true},
    "question_id": {type: String, required: true}
    */
})

export default mongoose.model("Answer", answerSchema);