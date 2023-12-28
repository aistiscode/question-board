import express from "express";
import answerModel from "../models/answer.js";
import AUTHENTICATE_USER from "../middleware/authentication.js";
const answerRouter = express.Router();

const GET_QUESTION_ANSWERS = async (req, res) => {
  try {
    const questionId = req.params.id;
    const answers = await answerModel.find({ question_id: questionId });
    res.status(200).json({ answers: answers });
  } catch (err) {
    console.log("COULDN'T GET QUESTION ANSWERS. ERROR:", err);
    res.status(500).json({ error: "Internal server error. Please try again later." });
  }
};

const POST_QUESTION_ANSWER = async (req, res) => {
  try{
    const answer = new answerModel({
      answer_text: req.body.answer_text,
      question_id: req.params.id,
    });

    const response = await answer.save();
    console.log(response);
    res.status(201).json({ response: response });
  } catch (err) {
    console.error("COULDN'T POST QUESTION ANSWER: ", err);
    res.status(500).json({ error: "Internal server error. Please try again later." });
  }
};

const DELETE_ANSWER = async (req, res) => {
  try{
    const response = await answerModel.deleteOne({ _id: req.params.id });
    if (response.deletedCount === 0) {
      res.status(404).json({ error: "Answer not found." });
    } else {
      res.status(200).json({ message: "Answer deleted successfully." });
    }
  }catch(err){
    console.error("COULDN'T DELETE ANSWER: ", err);
    res.status(500).json({ error: "Internal server error. Please try again later." });
  }
};


const LIKE_ANSWER = async (req, res) => {
  try {
      const user_id = String(req.body.user_id);
      const answer_id = req.params.answer_id;

      const answer = await answerModel.findOne({ _id: answer_id });

      if (!answer) {
          return res.status(404).json({ message: "Answer not found" });
      }

      // Check if the user has already disliked the answer
      if (answer.dislikes.includes(user_id)) {
          // Remove user from dislikes array (toggle off)
          answer.dislikes.pull(user_id);
      }

      // Check if the user has already liked the answer
      if (answer.likes.includes(user_id)) {
          // Remove user from likes array (toggle off)
          answer.likes.pull(user_id);
      } else {
          // Add user to the likes array (toggle on)
          answer.likes.push(user_id);
      }

      await answer.save();

      return res.status(200).json({ message: `Answer liked successfully, ${answer}, ${user_id}` });
  } catch (error) {
      console.error("COULDN'T LIKE ANSWER: ", error);
      return res.status(500).json({ error: "Internal server error. Contact administration." });
  }
};

const DISLIKE_ANSWER = async (req, res) => {
  try {
      const user_id = req.body.user_id;
      const answer_id = req.params.answer_id;

      const answer = await answerModel.findOne({ _id: answer_id });

      if (!answer) {
          return res.status(404).json({ message: "Answer not found" });
      }

      // Check if the user has already liked the answer
      if (answer.likes.includes(user_id)) {
          // Remove user from likes array (toggle off)
          answer.likes.pull(user_id);
      }

      // Check if the user has already disliked the answer
      if (answer.dislikes.includes(user_id)) {
          // Remove user from dislikes array (toggle off)
          answer.dislikes.pull(user_id);
      } else {
          // Add user to the dislikes array (toggle on)
          answer.dislikes.push(user_id);
      }

      await answer.save();

      return res.status(200).json({ message: "Answer disliked successfully" });
  } catch (error) {
      console.error("COULDN'T DISLIKE ANSWER: ", error);
      return res.status(500).json({ error: "Internal server error. Contact administration." });
  }
};


export { GET_QUESTION_ANSWERS, POST_QUESTION_ANSWER, DELETE_ANSWER, LIKE_ANSWER, DISLIKE_ANSWER };
