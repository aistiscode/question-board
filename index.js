import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import userModel from "./src/models/user.js";

import 'dotenv/config';

import userRouter from "./src/routes/users.js";
import questionRouter from "./src/routes/questions.js";
import answerRouter from "./src/routes/answers.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(questionRouter);
app.use(answerRouter);

app.listen(process.env.PORT, ()=>{
    console.log(`listening on port ${process.env.PORT}`);
});

mongoose.connect(process.env.MONGO_DB, console.log("CONNECTED TO MONGO DATABASE VIA MONGOOSE.CONNECT!"));