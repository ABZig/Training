
const bodyParser = require ('body-parser');

const { dirname } = require("path");
var path = require('path');

var urlencodedParser = bodyParser.urlencoded({extended:false});

var db = require('../models/database');
const Course = db.courses;


const alert = require('alert');

const sequelize = require("../models/database");
const { response } = require("express");

module.exports = function(app){

app.get("/", (req, res) => {

    Course.findAll().then(Course => {
        res.render('index', {Course});
        console.log(Course);
    });

});

app.get("/form", (req, res) => {
    res.render("add_course");
});


app.post('/insert', urlencodedParser, (req,res)=>{
    return db.sequelize.sync().then(()=>{
        Course.create({
            name: req.body.courseName,
            duration: req.body.courseDuration,
            fees: req.body.courseFee,
     });
    alert("Added Successfully");
    res.redirect('/');
});
});


app.get("/update-course/:id", (req, res) => {
    const courseid = req.params.id;
    Course.findOne({where: {id: courseid}}).then(Course => {
        res.render('update_course', {Course});
    });
});

app.post("/update-course/:id", urlencodedParser, (req, res) => {
    const courseid = req.params.id;
    Course.update(
        {
            name : req.body.courseName,
            duration : req.body.courseDuration,
            fees : req.body.courseFee,
        },{
            where: {id:courseid}
        });
        alert("Updated Successfully");
        res.redirect("/");
    });


app.get('/:id', function(req, res) {
    const courseid = req.params.id; 
    Course.destroy(
        {
            where: {id:courseid}
        })
        alert("Deleted Successfully");
        res.redirect("/");
      });

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

