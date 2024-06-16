const model = require("../model/user");
const jwt = require("jsonwebtoken");

const getProfile = async (req, res) => {
 
  try {
    const authHeader = req.header("Authorization");
    console.log(authHeader)
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header is missing" });
    }

    const token = authHeader.replace("Bearer ", "");
  
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    const user = await model.findOne({ _id: decoded.user_id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user: user });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getProfile };
