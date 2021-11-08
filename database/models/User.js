module.exports = function(sequelize, dataTypes){

    let alias = "User";

    let cols = {
        id:{
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
        },
        name:{
            type: dataTypes.STRING,
        },
        email:{
            type: dataTypes.STRING,
        },
        password:{
            type: dataTypes.STRING,
        },
    }

    let config = {
        timestamps: false,
        tableName: "users",
        underscorded: true
    }

    const User = sequelize.define(alias, cols, config)
    //Creo la relacion de muchos a muchos entre Usuarios y usuarios utilizando la tabla intermedia Followers
    //para que al generar las consultas pueda validar si un usuario sigue a otro

    return User
}