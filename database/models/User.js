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

    return User
}