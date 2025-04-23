const mongoose = require("mongoose");

const post = new mongoose.Schema({
    newPost:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    selectedCategory:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model("post",post);