var express = require('express');
var router = express.Router();
let userController = require('../controllers/userController')

/* GET users listing. */
router.get('/register', userController.register);
router.get('/login', userController.login);


router.post('/register', userController.store);
router.post('/login', userController.processLogin);
router.post('/logout', userController.logout)


module.exports = router;
