// middleware function to check for logged-in users
const account = require('../models/account');
// const user = require('../models/user');

var sessionChecker = (req, res, next) => {
    if (req.session._id) {
      next();
    } else {
      res.redirect("/login");
    }
};


//middleware function to check for legitimate user
var userChecker = async (req, res, next) => {
    let record = await account.findOne({_id: req.params.id});
    let uid = false;
    record.userid.forEach(element => { 
      if(req.session._id == element._id){
        uid = true;
      }
    });
    if(uid == true){
      next();
    }else{
      return res.status(401).json({
        error: 'Permission Denied'
       });
    }
};

module.exports = {sessionChecker, userChecker};
