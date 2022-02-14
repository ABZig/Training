var path = require('path');

var db = require('../config/database');
const course = db.courses;

const alert = require('alert');

const sequelize = require("../config/database");


module.exports = {

home: (req, res) => {
       course.findAll().then(course => {
        res.render('index', {course : course });
        console.log(course);
        
        });
},

getAddCourse: (req, res) => {
        res.render("add_course");
    },


postAddCourse: (req, res) => {
      return db.sequelize.sync().then(()=>{
        course.create({
            name: req.body.courseName,
            duration: req.body.courseDuration,
            fees: req.body.courseFee,
        });
        alert("Added Successfully");
        res.redirect('/');
    });
},

getUpdateCourse: (req, res) => {
    const courseid = req.params.id;
    course.findOne({where: {id: courseid}}).then(course => {
    res.render('update_course', {course : course });
        });
    },

postUpdateCourse: (req, res) => {

       const courseid = req.params.id;
        course.update(
        {
            name : req.body.courseName,
            duration : req.body.courseDuration,
            fees : req.body.courseFee,
        },{
            where: {id:courseid}
        });
        alert("Updated Successfully");
        res.redirect("/");
},

getDelete: (req, res) => {
       const courseid = req.params.id; 
        course.destroy(
        {
            where: {id:courseid}
        });
        alert("Deleted Successfully");
        res.redirect("/");
      },
    }

// db.sequelize.sync().then((result) => {
    //     console.log(result);
    //         var date = new Date().getTime();
    //         const sql = `INSERT INTO abhishekc.courses (name, duration, fees, createdAt, updatedAt)
    //         VALUES ('${req.body.courseName}','${req.body.courseDuration}','${req.body.courseFee}',datetime('now'), datetime('now'))`;
    //         db.sequelize.query(sql, {
    //             type: sequelize.QueryTypes.INSERT
    //         })
    // }).then(course => {
    //     console.log("Customer Created: ", course);
    // })
    // .catch((err)=>{
    //     console.log(err);
    // });
    // res.redirect('/');

