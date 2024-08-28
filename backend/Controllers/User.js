const User = require('../Model/User');
const bcrypt = require('bcryptjs');
const {generateToken} = require("../jwtUtils");

const signup = async (req, res) => {
    try{
        let userExists = await User.findOne({email: req.body.email});
        if(userExists){
            return res.status(404).send("User already exists!");
        }
        var salt = bcrypt.genSaltSync(10);
        var secPass = bcrypt.hashSync(req.body.password, salt);
        var user = await User.create({
            name : req.body.name,
            username : req.body.username,
            email : req.body.email,
            password : secPass,
        });
        const data = {
            user : {
                id : user.id
            }
        }
        const token = generateToken(data);
        res.json({
            success: true,
            message: 'Authentication successful!',
            token: token,
          });
    }
    catch(err){
        res.status(500).send({success : false, error : "Error creating user: " + err.message});
    }
}

const login = async (req, res) => {
    try{
        let user = await User.findOne({email : req.body.email});
        if(!user){
            return res.status(404).send({success : false, message : "Incorrect credentials entered"});
        }
        const checkPass = await bcrypt.compare(req.body.password, user.password);
        if(!checkPass){
            return res.status(404).send({success : false, message : "Wrong password entered"});
        }
        const data = {
            user : {
                id : user.id
            }
        }
        const token = generateToken(data);
        res.json({
            success: true,
            message: 'Authentication successful!',
            token: token,
          });
    }
    catch (err){
        res.status(500).send({success: false, message: "Error logging in : " + err.message});
    }
}

module.exports = {signup, login};