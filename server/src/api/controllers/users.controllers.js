const user = require('../models/users.models');
const bcrypt = require('bcrypt');
const {validationEmail, validationPassword} = require('../../validators/validation');
const {verifySign, generateSign} = require('../../jwt/jwt');

const register = async (req, res, next) => {
    try {
        const newUser = new user(req.body);
        if(!validationEmail(req.body.email)){
            res.status(403).send({code: 403, message: "Your email doesn't meet the requirements, dear boardgamer!"})
            return next();
        }
        if(!validationPassword(req.body.password)){
            res.status(403).send({code: 403, message: "Your password doesn't meet the requirements, dear boardgamer!"})
            return next();
        }
        newUser.password = bcrypt.hashSync(newUser.password, 10);
        createdUser = await newUser.save();
        return res.status(201).json(createdUser);
    }
    catch (error) {
        return res.status(500).json(error)
    }
};

const login = async (req, res, next) => {
    try {
        const userInfo = await user.findOne({email: req.body.email});
        if(bcrypt.compareSync(req.body.password, userInfo.password)){
            const token = generateSign(userInfo._id, userInfo.email);
            return res.status(200).json(token);
        } else{
            return res.status(400).json({message: 'Wrong password, you dear boardgamer!'});
        }
        if(!userInfo){
            return res.status(400).json({message: 'Wrong user, you dear boardgamer!'});
        }
    }
    catch (error) {
        return res.status(500).json(error)
    }
};

module.exports = {register, login};