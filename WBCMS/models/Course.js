const Sequelize = require("sequelize");
const sequelize = require("../config/database");

module.exports=(sequelize, DataTypes) => {

const Course = sequelize.define("AllCourses",{
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        duration: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        fees: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    });
    return Course;
}


