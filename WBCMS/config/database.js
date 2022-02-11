const {Sequelize,DataTypes} = require('sequelize'); 


const sequelize = new Sequelize('abhishekc','abhishekc', 'pFt98FXD7qkuJ3hjrzk77FTBKYxA5VWx',{
    host:'15.206.7.200',
    dialect: 'mysql',
    port:3310,
});

const db={};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.courses = require('../models/Course')(sequelize,DataTypes)
db.sequelize.sync()
.then(()=>{
    console.log("yes're sync");
})

module.exports = db;

// return sequelize.query(`select * from abhishekc.courses`,(err, res) =>{
//     return console.log(res)
// })