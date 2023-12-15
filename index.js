import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import userModel from "./src/models/user.js";

import 'dotenv/config';


const app = express();

app.use(cors());
app.use(express.json());

app.listen(process.env.PORT, ()=>{
    console.log(`listening on port ${process.env.PORT}`);
})

app.get("/", (req, res)=>{
    console.log(new userModel);
})

mongoose.connect(process.env.MONGO_DB, console.log("CONNECTED!"));

