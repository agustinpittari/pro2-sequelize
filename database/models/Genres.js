module.exports = function(sequelize, dataTypes){

    let alias = "Genre";

    let cols = {
        id:{
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
        },
        name:{
            type: dataTypes.STRING,
        },
        ranking:{
            type: dataTypes.INTEGER,
        },
        active:{
            type: dataTypes.INTEGER,
        }
    }
    
    let config = {
        timestamps:false,
        underscored:true,
        tableName: "Genres"
    }

    const Genre = sequelize.define(alias, cols, config)

    Genre.associate = function(models){
        Genre.hasMany(models.Movie, {
            as: "peliculas",
            foreignKey: "genre_id"
        })
    }

    return Genre

}