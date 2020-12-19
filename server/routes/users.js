const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const express = require('express');
const router = express.Router();
 
router.post('/', async (req, res) => {       
 
    let user = await userModel.findOne({ username: req.body.username });
    let email = await userModel.findOne({ email: req.body.email });
    if (user) {
        // alert('user already exists!')
        return res.status(206).send('Username already taken!');
    } else if(email){
        return res.status(206).send('Email exists !!');
    }else {
        user = new userModel({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        // user.repassword = await bcrypt.hash(user.repassword, salt);
        await user.save();
        res.send(user);
    }
});


router.get('/',async (req,res)=>{
    userModel.find({})
    .then((data)=>{
        //console.log(data);
        res.status(200).send(data);
    })
    .catch((err)=>{
        //console.log(err);
        res.status(500).send();
    })   
})
 
module.exports = router;