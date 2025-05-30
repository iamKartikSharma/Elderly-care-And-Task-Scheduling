const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");
const router = express.Router();

router.post("/signup", async (req, res) => {
  console.log("Signup request received:", req.body);
  const { name, email, password, type } = req.body;
  try {
    const existingUser  = await User.findOne({ email });
    if (existingUser ) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser  = new User({ name, email, password: hashedPassword, type });
    await newUser .save();
    res.status(201).json({ message: "User  registered successfully" });
  } catch (err) {
    console.error("Signup error:", err); 
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User  not found" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).json({ message: "Incorrect password" });

    const token = jwt.sign({ id: user._id, type: user.type }, "kartik", { expiresIn: "1d" });

    res.status(200).json({ token, type: user.type, name: user.name });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/Elder", async(req,res) =>{
  try{
    const elders =await User.find({type:"Elder"});
    res.status(200).json(elders);
  }catch(err){
    res.status(500).json({message:err.message});
  }
})

router.get("/family", async(req,res) =>{
  try{
    const elders =await User.find({type:"Family"});
    res.status(200).json(elders);
  }catch(err){
    res.status(500).json({message:err.message});
  }
})

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "No token provided" });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });
    req.userId = decoded.id;
    req.userType = decoded.type;
    next();
  });
};


router.get("/", verifyToken, async (req, res) => {
  console.log("Get all users request received");
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({ message: "No users found" });
  }
});

module.exports = router;