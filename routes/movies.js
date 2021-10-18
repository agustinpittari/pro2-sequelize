var express = require('express');
var router = express.Router();

const movieController = require('../controllers/movieController')

/* GET users listing. */
router.get('/', movieController.index);
router.get('/search', movieController.search);
router.get('/findAll', movieController.findAll);
router.get('/bygenre', movieController.byGenre);

router.get('/detail/:id', movieController.detail);




module.exports = router;