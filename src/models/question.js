import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
    "question_text": {type: String, required: true},
    "creation_date": {type: Date, required: true},
    "id": {type: String, required: true},
    "user_id": {type: String, required: false}
})


export default mongoose.model("Question", questionSchema);