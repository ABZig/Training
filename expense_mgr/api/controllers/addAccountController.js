//require files
const mongoose = require('mongoose');
const account = require('../models/account');
const user = require('../models/user');
const member = require('../models/member');
const alert = require('alert');

//export code
module.exports = {

gethome:async (req, res) => {
    const result = await account.find({ userid:req.session._id})  // .populate({path :'members', select: 'name'}).exec();  
    //const result = await member.find({ userid:req.session._id}).populate({path :'members', select: 'name'}).exec();
    // const result = await account.aggregate([{ $lookup:({ from: 'member', localField: 'userid', foreignField: 'members', as: 'details'}) }]);
    console.log(result);
    // account.find({ $or:[ {'userid':req.session._id}, {'members':req.session._id} ]}).exec();
    userDetails = await user.findOne({_id:req.session._id}).exec();
    // const members = await member.findOne({members: result._id}).exec();
    // console.log(members);
    res.render('home',{result,userDetails});
},

//post request for add account 
postAddAccount: (req, res) => {
    account.create({
      _id: mongoose.Types.ObjectId(),
      accountname: req.body.accountname,
      userid:req.session._id
    })
    .then(result => {
      res.redirect('/home');
    }).catch(err => {
      console.log(err);
    });
},

//get request for update account
getUpdateAccount: (req, res) => {
  const accountid = req.params.id;
  account.findOne({
   _id: accountid
  })
  .exec()
  .then((result) => {
      console.log(result);
       res.render('update-account' , {result});
   }).catch((err) => {
       console.log(err);
   });
 },


//post request for update account
postUpdateAccount: (req, res) => {
  const accountid = req.params.id;
   account.updateOne(
    { 
      _id:accountid
     },
     {
       $set: { accountname : req.body.accountname }
    })
   .then(()=>{
    alert("Updated Successfully");
    res.redirect("/home");
   });
},

//get request for delete account
getDelete: (req, res) => {
    const accountid = req.params.id;
    account.deleteOne({_id:accountid}).then((result) => {
         alert("Deleted Successfully");
         res.redirect("/home");
     }).catch((err) => {
         console.log(err);
     });
   }

}