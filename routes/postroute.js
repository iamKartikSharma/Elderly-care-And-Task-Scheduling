const express = require("express");
const post = require("../models/posts");
const router = express.Router();

router.get("/comunity-post",async(req,res)=>{
    try{
        const data = await post.find();
        res.status(200).json(data);

    }catch(err){
        res.json({message:err.message});
    }
})