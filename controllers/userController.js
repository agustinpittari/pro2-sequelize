let db = require('../database/models')
let bcrypt = require('bcryptjs')

let userController = {

    register: function(req, res){
        res.render('register')
    },
    store: function(req, res){
        let passwordEncriptada = bcrypt.hashSync(req.body.password, 10)
        console.log(passwordEncriptada)
        db.User.create({
            name: req.body.name,
            email: req.body.email,
            password: passwordEncriptada
        })
        .then(user => {
            res.redirect('/movies')
        })
        .catch(err => {
            console.log(err);
            res.send(err)
        })
    },
    login: function(req,res){
        res.render('login')
    },
    processLogin: function(req,res){
        db.User.findOne({
            where : {
                email: req.body.email
            }
        })
        .then(user => {
            if(user != undefined){
                let passwordCorrecta = bcrypt.compareSync(req.body.password, user.password)
                if(passwordCorrecta == true){
                    res.send("Bienvenido al sitio")
                }else {
                    res.send("Credenciales invalidas")
                }

            }
        })
        .catch(err => {
            console.log(err);
            res.send(err)
        })
    }

}

module.exports = userController