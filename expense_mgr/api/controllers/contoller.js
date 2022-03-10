//require files
const transaction = require('../models/transaction');
const member = require('../models/member');
const account = require('../models/account');

//export code
module.exports = {

//get request for home page
home: (req, res) => {
    if(req.session._id){
      account.findOne({userid:req.session._id}).then((result)=>{
      res.render('home',{result})
  })
  }else{
    res.render('index');
  }
},

//get request for gesture page
gesture: (req, res) => {
    res.render('gesture');
},

//get request for account details
getAccDetails: async (req, res) => {
  let result1;
  let result2;
  let result3;

  try {
    result1 = await transaction.find({ accountid: req.params.id }).sort({date: 'descending'}).exec();
  } catch (err) {
    return res.status(400).json({
      error: "Erorr en transaction",
    });
  }
  try {
    result2 = await member.find({ accountid: req.params.id }).exec();
  } catch (err) {
    return res.status(400).json({
      error: "Erorr en member",
    });
  }
    try {
      result3 = await account.findOne({ _id: req.params.id }).exec();
    } catch (err) {
      return res.status(400).json({
        error: "Erorr en accountname",
      });
  }


  let DebitAmount=0;
  let CreditAmount=0;
  let TotalAmount=0;

  for (i = 0; i < result1.length; i++) {
    var obj = result1[i];
    if (obj["preferedtype"].localeCompare("Debit")==0) {
      DebitAmount = Number(obj["addamount"]) + DebitAmount;
    } else {
      CreditAmount = Number(obj["addamount"]) + CreditAmount;
    }
    TotalAmount = CreditAmount - DebitAmount;
}

let record = {
    debit: DebitAmount,
    credit: CreditAmount,
    balance: TotalAmount,
    id: req.params.id,
  };

  res.render(
    'acc-details',
    { result1, result2, result3, record}
  );
},

//get request for logout
logout: (req, res) => {
    if (req.session._id) {
      req.session.destroy((error)=>{
        if(error){
          console.log(error);
        }
        else{
          res.redirect("/");
        }
      })
    }
  }
}