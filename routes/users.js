var express = require('express');
var router = express.Router();
let userController = require('../controllers/userController')

/* GET users listing. */
router.get('/register', userController.register);
router.get('/login', userController.login);

//Creo la ruta de detalle de usuario
router.get('/detail/:id', userController.detail)
//Creo la ruta de perfil de usuario
router.get('/profile', userController.profile)
router.get("/test", userController.test)

//Creo la ruta de seguir usuario por metodo POST
router.post('/seguir/:id', userController.follow)
//Creo la ruta de dejar de seguir usuario por metodo POST
router.post('/dejarSeguir/:id', userController.unfollow)


router.post('/register', userController.store);
router.post('/login', userController.processLogin);
router.post('/logout', userController.logout)


module.exports = router;
