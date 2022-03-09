//require files
const bcrypt = require('bcrypt');
const User = require('../models/user');

//export code
module.exports = {
    //get request for login
    getlogin: (req, res) => {
        req.session.test ? req.session.test++ : req.session.test = res.render('login');
    },

    //post request for login
    postlogin: (req, res) => {
        User.find({ emailaddress: req.body.emailaddress})
        .then(result => {
            if(result.length < 1){
                return res.status(401).json({
                    message: 'Auth failed!'
                });
            }
            bcrypt.compare(req.body.password, result[0].password, (err, success) => {
                    if (err) {
                        return res.status(401).json({
                            message: 'Auth failed'
                        });
                    }
                    if(success){
                        let session = req.session;
                        session._id = result[0]._id;
                        session.email = result[0].emailaddress;
                        return res.redirect("/home");
                    }
                     res.status(401).json({
                        message: 'Auth failed!!'
                    });
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
