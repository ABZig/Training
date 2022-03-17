//require files
const bcrypt = require('bcrypt');
const User = require('../models/user');

//export code
module.exports = {
//get request for login
getlogin: (req, res) => {
        req.session.test ? req.session.test++ : req.session.test;
         var message = {
           flag: false,
           type: "",
           intro: "",
           message: "",
         };
         res.render("login", { message });
},

//post request for login
postlogin: (req, res) => {
        User.find({ emailaddress: req.body.emailaddress})
        .then(result => {
            if(result.length < 1){
                message = {
                  flag: true,
                  type: "warning",
                  intro: "Auth",
                  message: "Authentication Fail",
                };
                res.render("login", { message });
            }
            bcrypt.compare(req.body.password, result[0].password, (err, success) => {
                    if (err) {
                        message = {
                          flag: true,
                          type: "warning",
                          intro: "Error",
                          message: "Something Wrong In Password!",
                        };
                        res.render("login", { message });
                    }
                    if(success){
                        let session = req.session;
                        session._id = result[0]._id;
                        session.email = result[0].emailaddress;
                        return res.redirect("/home");
                    }
                });    
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
        }
}
