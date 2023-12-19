import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
    "question_text": {type: String, required: true},
    "date": {type: String, required: true},
    "id": {type: String, required: true},
    "user_id": {type: String, required: true}
})


export default mongoose.model("Question", questionSchema);