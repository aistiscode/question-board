import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/user.js';

const REGISTER = async (req, res)=>{
    try{
        const mySalt = await bcrypt.genSalt(10);
        const myHash = bcrypt.hashSync(req.body.password, mySalt);


        const user = new userModel({
            "username": req.body.username,
            "email": req.body.email,
            "password": myHash,
        });

        user.id = user._id;

        console.table(user);
        const response = await user.save();
        console.log(response); 
            
            
        return res.status(200).json({ message: "User registered successfully", response });
    }catch (err) {
        console.log(err);
        return res.status(400).json({ message: "Registration was not successful" });
    }
}

const LOGIN = async (req, res)=>{
    try{
        const user = await userModel.findOne({ email: req.body.email });
    
        if (!user) {
          return res.status(404).json({ msg: "User does not exist" });
        }
    
        const isPasswordMatch = bcrypt.compareSync(
          req.body.password,
          user.password
        );
    
        if (!isPasswordMatch) {
          return res.status(404).json({ msg: "User does not exist" });
        }
    
        const token = jwt.sign(
            { email: user.email, id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "12h" }
          );
    
        return res.status(200).json({ token });
      }catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "Something went wrong" });
      }
}

export {REGISTER, LOGIN};
