var express = require('express');
var router = express.Router();

const movieController = require('../controllers/movieController')

/* GET users listing. */
router.get('/', movieController.index);
router.get('/search', movieController.search);
router.get('/findAll', movieController.findAll);
router.get('/bygenre', movieController.byGenre);
router.get('/new', movieController.create);
router.get('/edit/:id', movieController.edit);
router.get('/detail/:id', movieController.detail);
router.get('/relaciones', movieController.demo);


router.post('/newPost', movieController.store)
router.post('/edit/:id', movieController.update)
router.post('/delete/:id', movieController.delete)


module.exports = router;