//require files
const bcrypt = require('bcrypt');
const User = require('../models/user');
const mongoose = require('mongoose');
const tester = require('../../nodemailer/server');
const account = require('../models/account');
const { check, validationResult } = require ("express-validator");

//signup validation
const signup_validation = () => [
    check("firstname", "Enter firstname!").trim().notEmpty(),
    check("lastname", "Enter lastname!").trim().notEmpty()
];

//export code
module.exports = {

//get request for signup
getsignup: (req, res) => {
     var message =  {
        flag : false,
        type: "",
        intro: "",
        message: "",
     };
    res.render("signup", {message});
},

//post request for signup
postsignup: (req, res) => {
    const err = validationResult(req);
    var message;
    if (err.isEmpty()) {
    User.find({emailaddress: req.body.emailaddress})
    .then(result => {
        if(result.length >= 1) {
            message = {
              flag: true,
              type: "warning",
              intro: "Mail Error",
              message: "Mail Already Exists",
            };
            res.render("signup", {message});
        }else if (req.body.password.length < 8){
            message = {
              flag: true,
              type: "warning",
              intro: "Password Error",
              message: "Password must be atleast 8 character long",
            };
            res.render("signup", { message });
        }else{
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err){
                    message = {
                      flag: true,
                      type: "warning",
                      intro: "Error",
                      message: "Something Wrong In Password!",
                    };
                    res.render("signup", { message });
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
                        ownership: result._id,
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
        message = {
          flag: true,
          type: "warning",
          intro: "Value Error",
          message: "Null values are not allowed !!",
        };
        res.render("signup", { message });
    }

},
validation: [signup_validation()]
}