//require files
const bcrypt = require('bcrypt');
const User = require('../models/user');
const mongoose = require('mongoose');
const tester = require('../../nodemailer/server');
const account = require('../models/account');
const { check, validationResult } = require ("express-validator");

const signup_validation = () => [
    check("firstname", "Enter firstname!").trim().notEmpty(),
    check("lastname", "Enter lastname!").trim().notEmpty()
];

//export code
module.exports = {

//get request for signup
getsignup: (req, res) => {
    res.render('signup');
},

//post request for signup
postsignup: (req, res) => {
    const err = validationResult(req);
    if (err.isEmpty()) {
    User.find({emailaddress: req.body.emailaddress})
    .then(result => {
        if(result.length >= 1) {
            return res.status(409).json({
                message: "Mail exists"
            });
        }else if (req.body.password.length < 8){
            return res.status(400).json({
                message: 'Password must be atleast 8 character long.',
            });
        }else{
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err){
                    return res.status(500).json({
                        error: err
                    });
                } else{
                    const user = new User({
                    _id: mongoose.Types.ObjectId(),
                    firstname: req.body.firstname,
                    lastname:req.body.lastname,
                    emailaddress: req.body.emailaddress,
                    password: hash
                });
                user.save()
                .then(result => {
                    account.create({
                        _id: mongoose.Types.ObjectId(),
                        accountname:result.firstname + ' (Default) ',
                        userid:result._id
                    })
                    tester(req);
                    res.render('gesture');
                })
                .catch(err => {
                console.log(err);
                    });
                }
            })
        }    
    })
    }else{
        return res.status(400).json({
            message: 'Null values are not allowed !!',
        });
    }

},

validation: [signup_validation()]
}