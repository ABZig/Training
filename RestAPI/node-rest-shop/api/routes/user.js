const express = require("express");
const router =  express.Router();

const UserContoller = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');

//Handle requests to /user
router.post('/signup', UserContoller.user_signup);

router.post('/login', UserContoller.user_login);

router.delete("/:userId", checkAuth, UserContoller.user_delete);


module.exports = router;  
