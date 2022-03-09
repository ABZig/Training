const express = require('express');
const route = express.Router();

const controller = require("../controllers/contoller");
const signupController = require("../controllers/signupController");
const loginController = require("../controllers/loginController");
const addTranscController = require("../controllers/addTranscController");
const addAccountController = require("../controllers/addAccountController");
const addMemberController = require("../controllers/addMemberController");
const sessionChecker = require('../middleware/middleware');

route.get('/', controller.home);

route.get('/signup', signupController.getsignup);
route.post('/signup', signupController.postsignup);

route.get('/login', loginController.getlogin);
route.post('/home', sessionChecker, loginController.postlogin);

route.get('/gesture', controller.gesture);

route.get('/home', addAccountController.gethome);
route.post('/addaccount', addAccountController.postAddAccount);
route.get('/update-account/:id', addAccountController.getUpdateAccount);
route.post('/update-account/:id', addAccountController.postUpdateAccount);
route.get('/delete/:id', addAccountController.getDelete);

route.get('/logout', controller.logout);

route.get('/acc-details/:id', controller.getAccDetails);

route.get('/addtransc/:id', addTranscController.getAddTransc);
route.post('/addtransc/:id', addTranscController.postAddTransc);
route.get('/update-transc/:id', addTranscController.getUpdateTransc);
route.post('/update-transc/:id', addTranscController.postUpdateTransc);
route.get('/transaction/delete/:id', addTranscController.getDeleteTransc);

route.get('/add-member/:id', addMemberController.getAddMember);
route.post('/add-member/:id', addMemberController.postAddMember);
route.get('/add-member/delete/:id', addMemberController.getDeleteMember);

module.exports = route;