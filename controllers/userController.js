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
                    req.session.user = user.email
                    if(req.body.recordame){
                        res.cookie("usuarioId", user.id, {maxAge: 1000 * 60 * 30})
                    }
                    res.redirect("/")
                }else {
                    res.send("Credenciales invalidas")
                }

            }
        })
        .catch(err => {
            console.log(err);
            res.send(err)
        })
    },
    logout: function(req, res){

        req.session.destroy()
        res.clearCookie("usuarioId");

        res.redirect("/users/login")
    }

}

module.exports = userController