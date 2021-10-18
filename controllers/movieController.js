const db = require('../database/models');
const movie = db.Movie;
const op = db.Sequelize.Op

const movieController = {
    index: function (req, res) {
        movie.findAll()
        .then( movies =>{
            return res.render('index',{movies:movies})
        })
        .catch( error => {
            return res.send(error);
        })
    },
    detail: function (req, res) {
        let id = req.params.id
        movie.findByPk(id)
        .then(movie => {
            return res.render('detail', {movie: movie})
        })
        .catch( error => {
            return res.send(error);
        })
    },
    findAll : function (req, res) {
        // nuestro codigo para buscar mis datos en movie db
        movie.findAll()
        .then( data =>{
            return res.send(data);
        })
        .catch( error => {
            return res.send(error);
        })
    },
    search: function (req, res) {
        
        let search = req.query.search
        
        movie.findAll({
            where: [
                {'title': {[op.like]:`%${search}%`}}
            ],
            order: [
                ['rating','ASC']
            ],
            limit:5,
            offset:5
        })
        .then( movies => {
            return res.send(movies);
        })
        .catch(error => {
            return res.send(error)
        })
    },
    byGenre: function (req, res) {
        movie.findAll({
            where: [
                { genre_id: 3}
            ]
        })
        .then(movies => {
            return res.send(movies)
        })
    }
}

module.exports = movieController;