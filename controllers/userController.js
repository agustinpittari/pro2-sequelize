let db = require('../database/models')
let bcrypt = require('bcryptjs')
const op = db.Sequelize.Op

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
        if(req.session.user == undefined){
            res.render('login')
        } else {
            res.redirect("/")
        }
    },
    processLogin: function(req,res){

        let errors = {}

        if(req.body.email == ""){
            errors.message = "El campo de email no puede estar vacio";
            res.locals.error = errors;
            res.render("login");
        } else {

            db.User.findOne({
                where : {
                    email: req.body.email
                }
            })
            .then(user => {
                if(user != undefined){
                    let passwordCorrecta = bcrypt.compareSync(req.body.password, user.password)
                    if(passwordCorrecta == true){
                        delete user.password
                        req.session.user = user
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
        }
        
    },
    logout: function(req, res){

        req.session.destroy()
        res.clearCookie("usuarioId");

        res.redirect("/users/login")
    },
    //Crear metodo de detalle de usuario, buscandolo por el parametro de la ruta
    detail: function(req, res){
        //Busco al usuario por el parametro
        
        //Verifico si el usuario encontrao es seguido por el usuario en sesion
    },
    //Crear metodo de perfil, buscandolo por el id de la session del usuario y validar que la misma exista
    profile: function(req, res){
        //Valido si existe session
        //Busco al usuario por el id de la session y envio sus datos a la vista
    },
    //Crear metodo follow que permita crear un registro en la tabla intermedia
    follow: function(req, res){
        //Valido si existe session

        //Creo el registro en la tabla Seguidores

    },
    //Crear metodo unfollow que permita eliminar un registro en la tabla intermedia
    unfollow: function(req, res){
        //Valido si existe session

        //Elimino con el metodo destroy el registro de la tabla intermedia
    },

}

module.exports = userController