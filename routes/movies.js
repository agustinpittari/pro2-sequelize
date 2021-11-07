let express = require('express');
let router = express.Router();
const multer = require('multer');
const path = require('path');

const movieController = require('../controllers/movieController')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/movies')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
  
  const upload = multer({ storage: storage })


/* GET users listing. */
router.get('/', movieController.index);
router.get('/search', movieController.search);
router.get('/findAll', movieController.findAll);
router.get('/bygenre', movieController.byGenre);
router.get('/new', movieController.create);
router.get('/edit/:id', movieController.edit);
router.get('/detail/:id', movieController.detail);
router.get('/relaciones', movieController.demo);


router.post('/newPost', upload.single("movie"), movieController.store)
router.post('/edit/:id', upload.single("movie"),movieController.update)
router.post('/delete/:id', movieController.delete)


module.exports = router;