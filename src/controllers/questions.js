import questionModel from "../models/question.js";

const GET_ALL_QUESTIONS = async (req, res)=>{
    try{
        const questions = await questionModel.find();
    
        res.status(200).json({questions: questions});

    }catch(err){
        console.log("COULD'NT GET ALL QUESTION. ERROR:", err)
    }
}

const POST_QUESTION = async (req, res)=>{
    try {
		const question = await new questionModel({
			question_text: req.body.question_text,
			creation_date: new Date(),
			user_id: req.body.user_id,
		});

		question.id = question._id;

		const response = await question.save();

		return res.status(200).json({ response: response });
	} catch (err) {
		console.error("COULDN'T POST QUESTION: ", err);
		return res.status(500).json({ err: "Internal error. Contact administration." });
	}
}

const DELETE_QUESTION = async (req, res)=>{
    try{

    }catch(err){
        
    }
}

export {GET_ALL_QUESTIONS, POST_QUESTION, DELETE_QUESTION};