import questionModel from "../models/question.js";
import AUTHENTICATE_USER from "../middleware/authentication.js";

const GET_ALL_QUESTIONS = async (req, res)=>{
    try{
        const questions = await questionModel.find();
    
        res.status(200).json({questions: questions});

    }catch(err){
        console.log("COULD'NT GET ALL QUESTION. ERROR:", err)
    }
}

const GET_QUESTION_BY_ID = async (req, res) => {
    try {
      const question = await questionModel.findOne({ question_id: req.params.question_id });
      return res.status(200).json({ question });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Something went wrong" });
    }
  };

const POST_QUESTION = async (req, res)=>{
    try {
        console.log("Req.body before middleware:", req.body);
		const question = await new questionModel({
			question_text: req.body.question_text,
			creation_date: new Date(),
			user_id: req.body.user_id,
		});
        console.log("Req.body AFTER middleware:", req.body);

		question.question_id = question._id;

		const response = await question.save();

		return res.status(200).json({ response: response });
	} catch (err) {
		console.error("COULDN'T POST QUESTION: ", err);
		return res.status(500).json({ err: "Internal error. Contact administration." });
	}
}

const DELETE_QUESTION = async (req, res)=>{
    try{
        const response = await questionModel.deleteOne({_id: req.params.question_id});
        return res.status(200).json({response:response})
    }catch(err){
        
    }
}


const LIKE_QUESTION = async (req, res) => {
    try {
        const user_id = String(req.body.user_id);
        console.log("User ID:", user_id);
        const question_id = req.params.question_id;

        const question = await questionModel.findOne({ _id: question_id });

        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        
        if (question.dislikes.includes(user_id)) {
          
            question.dislikes.pull(user_id);
        }

        
        if (question.likes.includes(user_id)) {
            
            question.likes.pull(user_id);
        } else {
           
            question.likes.push(user_id);
        }

        await question.save();

        return res.status(200).json({ message: `Question liked successfully, ${question}, ${user_id}` });
    } catch (error) {
        console.error("COULDN'T LIKE QUESTION: ", error);
        return res.status(500).json({ error: "Internal server error. Contact administration." });
    }
};

const DISLIKE_QUESTION = async (req, res) => {
    try {
        const user_id = req.body.user_id;
        const question_id = req.params.question_id;

        const question = await questionModel.findOne({ _id: question_id });

        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        
        if (question.likes.includes(user_id)) {
            question.likes.pull(user_id);
        }

        if (question.dislikes.includes(user_id)) {
            question.dislikes.pull(user_id);
        } else {
            question.dislikes.push(user_id);
        }

        await question.save();

        return res.status(200).json({ message: "Question disliked successfully" });
    } catch (error) {
        console.error("COULDN'T DISLIKE QUESTION: ", error);
        return res.status(500).json({ error: "Internal server error. Contact administration." });
    }
};


export {GET_ALL_QUESTIONS, GET_QUESTION_BY_ID, POST_QUESTION, DELETE_QUESTION, LIKE_QUESTION, DISLIKE_QUESTION};