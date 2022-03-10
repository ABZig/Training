const express = require('express');
const route = express.Router();

const controller = require("../controllers/contoller");
const signupController = require("../controllers/signupController");
const loginController = require("../controllers/loginController");
const addTranscController = require("../controllers/addTranscController");
const addAccountController = require("../controllers/addAccountController");
const addMemberController = require("../controllers/addMemberController");
// const sessionChecker = require('../middleware/middleware');
// const userChecker = require('../middleware/middleware');
const {sessionChecker, userChecker} = require('../middleware/middleware');


route.get('/', controller.home);

route.get('/signup', signupController.getsignup);
route.post('/signup', signupController.postsignup);

route.get('/login', loginController.getlogin);
route.post('/home', loginController.postlogin);

route.get('/gesture', controller.gesture);

route.get('/home', sessionChecker,addAccountController.gethome);
route.post('/addaccount', sessionChecker, userChecker, addAccountController.postAddAccount);
route.get('/update-account/:id', sessionChecker, userChecker, addAccountController.getUpdateAccount);
route.post('/update-account/:id', sessionChecker, userChecker, addAccountController.postUpdateAccount);
route.get('/delete/:id', sessionChecker, userChecker, addAccountController.getDelete);

route.get('/logout', controller.logout);

route.get('/acc-details/:id', sessionChecker, userChecker, controller.getAccDetails);

route.get('/addtransc/:id', sessionChecker, userChecker, addTranscController.getAddTransc);
route.post('/addtransc/:id', sessionChecker, userChecker, addTranscController.postAddTransc);
route.get('/update-transc/:id', sessionChecker, addTranscController.getUpdateTransc);
route.post('/update-transc/:id', sessionChecker, userChecker, addTranscController.postUpdateTransc);
route.get('/transaction/delete/:id', sessionChecker, userChecker, addTranscController.getDeleteTransc);

route.get('/add-member/:id', sessionChecker, userChecker, addMemberController.getAddMember);
route.post('/add-member/:id', sessionChecker, userChecker, addMemberController.postAddMember);
route.get('/add-member/delete/:id', sessionChecker, userChecker, addMemberController.getDeleteMember);

module.exports = route;