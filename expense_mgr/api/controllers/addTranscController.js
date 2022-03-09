//require files
const mongoose = require('mongoose');
const transaction = require('../models/transaction');
const alert = require('alert');

//export code
module.exports = {

//get request for add transaction
getAddTransc: (req, res) => {
  let transcAdd = {
    id:req.params.id
  }
  res.render("add_transc", { transcAdd });
},

//post request for add transaction
postAddTransc: async function(req, res) {

  let acc = mongoose.Types.ObjectId(req.body.tranractionAccoutId);
  try{
    await transaction
      .create({
        _id: mongoose.Types.ObjectId(),
        date: req.body.date,
        preferedtype: req.body.preferedtype,
        description: req.body.description,
        addamount: req.body.addamount,
        accountid: acc
      })
      res.redirect("/acc-details/" + req.body.tranractionAccoutId);
    }
    catch(error){
     console.log(error);
    }
     
},

//get request for update transaction
getUpdateTransc: async function(req, res) {
    let result1 = await transaction.findById(req.params.id ).exec(); 
    console.log(result1);
    res.render('update-transc', {result1});

 },

 //post request for update transaction
postUpdateTransc: async (req, res) => {
  const transcid = req.params.id;
  let updtransc = await transaction.findById(req.params.id ).exec(); 
  transaction.updateOne(
    { 
      _id:transcid
     },
     {
       $set: { 
          date: req.body.date,
          preferedtype: req.body.preferedtype,
          description : req.body.description,
          addamount: req.body.addamount
        }
    })
   .then(()=>{
    alert("Updated Successfully");
    res.redirect("/acc-details/"+ updtransc.accountid);
   });
}, 

//get request for delete transaction
getDeleteTransc: async function(req, res){
  const transactionid = req.params.id;
  let result1 = await transaction.findById(req.params.id ).exec();
  transaction.deleteOne({_id:transactionid}).then((result) => {
    res.redirect("/acc-details/" + result1.accountid);
       alert("Deleted Successfully");
   }).catch((err) => {
       console.log(err);
   });
 }
}
