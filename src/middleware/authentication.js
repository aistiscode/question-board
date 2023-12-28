import jwt from "jsonwebtoken";

const AUTHENTICATE_USER = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Error in authorization" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Error in authorization" });
    }
    console.log("Decoded Token:", decoded);
    req.body.user_id = decoded.user_id;
    console.log("UserId in middleware:", req.body.user_id);
    return next();
  });
};

export default AUTHENTICATE_USER;