import bcrypt from 'bcrypt';


const REGISTER = async (req, res)=>{

    try{
        console.log("REGISTER LAUNCHED");
        res.status(200);
    }catch{

    }
}

const LOGIN = async (req, res)=>{
    try{
        console.log("LOGIN LAUNCHED");
        res.status(200);
        res.send("HEY");
    }catch(err){
        console.log("COULD NOT RUN LOGIN HERE IS CATCH ERROR: " + err);
    }
}

export {REGISTER, LOGIN};