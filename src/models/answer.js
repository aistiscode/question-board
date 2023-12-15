import mongoose from "mongoose";

const answerSchema = mongoose.Schema({
    "content": {type: String, required: true}
})

export default mongoose.model("Answer", answerSchema);