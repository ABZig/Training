const mongoose = require('mongoose');

//Schema for add account 
const AddAccountSchema = mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        accountname:{ type: String , required: true},
        userid: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
        // members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'member' }]
});

module.exports = mongoose.model('account', AddAccountSchema); 