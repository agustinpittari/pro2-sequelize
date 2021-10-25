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
            offset:0
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
    },
    create: function(req, res){
        db.Genre.findAll()
        .then(genres => {
            res.render('newMovie',{genres})
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
    },
    store: function(req, res){

        db.Movie.create({
            title: req.body.title,
            awards: req.body.awards,
            rating: req.body.rating,
            release_date: req.body.release_date,
            genre_id: req.body.genre_id,
            length: req.body.length
        })
        .then(movie => {
            res.redirect('/movies')
        })
        .catch(err => {
            console.log(err);
            res.send(err)
        })

    },
    edit: function(req, res){

        let pelicula = db.Movie.findByPk(req.params.id)
        
        let genres = db.Genre.findAll()

        Promise.all([pelicula, genres])
        .then(([pelicula, genres]) => {
            res.render('editMovie',{genres: genres, pelicula: pelicula})
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
    },
    update: function(req, res){

        let id = req.params.id
        
        db.Movie.update({
            title: req.body.title,
            awards: req.body.awards,
            rating: req.body.rating,
            release_date: req.body.release_date,
            genre_id: req.body.genre_id,
            length: req.body.length
        },
        {
            where: {
                id: id
            }
        })
        .then(movie => {
            res.redirect("/movies/detail/" + id)
        })

    },
    delete: function(req, res){
        let id = req.params.id
        db.Movie.destroy({
            where: {
                id: id
            }
        })
        .then(movie => {
            res.redirect('/movies')
        })
    }
}

module.exports = movieController;