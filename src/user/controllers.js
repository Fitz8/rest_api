const User = require("./model");
const jwt = require("jsonwebtoken");
// require("dotenv").config();

exports.createUser = async (req, res) => {
    try {  
        const newUser = await User.create(req.body);
        const savedUser = await newUser.save();
        const token = await jwt.sign({_id: newUser._id}, process.env.SECRET);
        //generate new token with newUser._id
        res.send({msg: "Create request sent", token, savedUser});
    } catch(error) {
        console.log(error);
        res.send({err: error});
    }
}

exports.findUser = async (req, res) => {
    try {  
        const results = await User.find(req.body);
        console.log(results);
        res.send(results);
    } catch(error) {
        res.send({err: error});
    }
}

exports.updateUser = async (req, res) => {
    try {  
        const results = await User.updateOne({username: req.body.username}, {$set: {email: req.body.newEmail}});
        if (results.acknowledged) {
            console.log(`The email for user ${req.body.username} has been updated to ${req.body.newEmail}!`);
        } else {
            console.log("Your update request has failed");
        }
        res.send({msg: "Update request sent"});
    } catch(error) {
        console.log(error);
        res.send({err: error});
    }
}

exports.deleteUser = async (req, res) => {
    try {  
        const results = await User.deleteOne(req.body);
        if (results.acknowledged) {
            console.log(`You have deleted ${req.body.username}!`);
        } else {
            console.log("Your delete request has failed");
        }
        res.send({msg: "Deletion request has been sent"});
    } catch(error) {
        console.log(error);
        res.send({err: error});
    }
}

exports.login = async (req, res) => {
    try { 
        const token = await jwt.sign({ _id: req.user._id }, process.env.SECRET);
        res.send({"user": req.user.username, token});
    } catch(error) {
        console.log(error);
        res.send({err: error});
    }
}
// {
//     "username": "Bob",
//     "email": "bobsemail@bob.com",
//     "password": "bobisgoat2k7"
// }