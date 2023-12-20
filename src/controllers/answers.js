import express, { Router } from "express";
import answerModel from "../models/answer.js"

const userRouter = express.Router();

console.log(userRouter);

const GET_QUESTION_ANSWERS = (req, res)=>{
    
}

const POST_QUESTION_ANSWER = async (req, res)=>{
    const answer = await new answerModel({
        answer_text: req.body.answer_text

    })
}

const DELETE_ANSWER = async (req, res)=>{
    const response = await answerModel.deleteOne({ _id: req.params.id });
}


export {GET_QUESTION_ANSWERS, POST_QUESTION_ANSWER, DELETE_ANSWER};