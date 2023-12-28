import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
    question_text: { type: String, required: true },
    creation_date: { type: Date, required: true },
    question_id: { type: String, required: true },
    user_id: { type: String, required: true },
    likes: [{ type: String }],
    dislikes: [{ type: String }],
});

export default mongoose.model("Question", questionSchema);