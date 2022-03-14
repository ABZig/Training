const mongoose = require('mongoose');

//Schema for add transaction 
const AddMemberSchema = mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId, 
        name:{ type: String, required: true },
        userid:{ type: mongoose.Schema.Types.ObjectId, ref: 'user' },
        accountid: [{ type: mongoose.Schema.Types.ObjectId, ref: 'account' }]
});

module.exports = mongoose.model('member', AddMemberSchema);