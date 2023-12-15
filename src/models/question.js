import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
    "title": {type: String, required: true},
    "description": {type: String, required: true}
})


export default mongoose.model("Question", questionSchema);