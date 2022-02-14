const express = require('express');
const route = express.Router();
const bodyParser = require("body-parser");
const controller = require("../controller/controller");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

route.get("/", controller.home);
route.get("/form", controller.getAddCourse);
route.post("/insert", urlencodedParser, controller.postAddCourse);
route.get("/update-course/:id", controller.getUpdateCourse);
route.post("/update-course/:id", urlencodedParser, controller.postUpdateCourse);
route.get("/delete/:id", controller.getDelete);

module.exports = route;