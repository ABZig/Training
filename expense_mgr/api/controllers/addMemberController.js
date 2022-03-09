//require files
const member = require('../models/member');
const alert = require('alert');
const mongoose = require('mongoose');
const user = require('../models/user');
const account = require('../models/account');


//export code
module.exports = {

//get request for add member 
getAddMember: (req, res) => {
    let memberAdd = {
      id:req.params.id
    }
    res.render("add-member", { memberAdd });
},

// // post request for add member 
// postAddMember: async (req, res) => {
//   try{
//     user.findOne({ emailaddress: req.body.emailaddress})
//     .then(result => {
//       member.create({
//         _id: mongoose.Types.ObjectId(),
//         name: result.firstname,
//         accountid: req.params.id,
//         userid: result._id
//       })
//       .then(result1 => {
//         account.updateOne ({ 
//           _id:req.params.id,
          
//          },
//          {
//           $push: { userid: result1.userid }
//           // $push: { members : result1._id }
//           // $set: { members : result1._id }
//         })
//       .then(record => {
//         res.redirect('/acc-details/' + req.params.id);
//       })
//     })
//     })
//     .catch(err => {
//       console.log(err);
//     });
//   }
//   catch(error){
//     console.log("Catch block");
//     console.log(error);
//   }
// },

//post request for add member
postAddMember:  (req, res) => {
  user.findOne({ emailaddress: req.body.emailaddress})
  .then(result => {
     if(result){
    account.findOne({
        _id:req.params.id,
        userid: { "$in": result._id }
    }).then(data => {
        console.log(data);
        if(data){
            return res.status(409).json({
                message: "Member exists"
            });
        }else{
            member.create({
                _id: mongoose.Types.ObjectId(),
                name: result.firstname,
                accountid: req.params.id,
                userid: result._id
              })
              .then(result1 => {
                account.updateOne ({ 
                  _id:req.params.id,  
                 },
                 {
                  $push: { userid: result1.userid }
                  // $push: { members : result1._id }
                  // $set: { members : result1._id }
                })
              .then(record => {
                res.redirect('/acc-details/' + req.params.id);
              })
            })
        }
    });
    } else {
        return res.status(401).json({
        error: 'User does not exist'
       });
    }
}).catch ((err)=> {
  console.log(err);
});
},

//get request for delete member 
getDeleteMember: async (req, res) => {
  const memberid = req.params.id;
  let result2 = await member.findById(req.params.id ).exec();
  console.log(result2);
  member.deleteOne({_id:memberid}).then((result) => {
      res.redirect("/acc-details/" + result2.accountid);
      // alert("Deleted Successfully");
   }).catch((err) => {
       console.log(err);
   });
 }
}



