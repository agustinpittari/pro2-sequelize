var express = require('express');
var router = express.Router();
const movieController = require('../controllers/movieController')
/* GET home page. */
router.get('/', movieController.index);

module.exports = router;
