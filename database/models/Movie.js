module.exports = function(sequelize, dataTypes){

    //Definir un alias.
    let alias = 'Movie'; //Con este alias sequelize va a identificar internamente al archivo de modelo.

    //Describir la configuración de las columnas de la tabla
    let columnas = {
        id:{
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
        },
        title:{
            type: dataTypes.STRING,
        },
        rating:{
            type: dataTypes.DECIMAL,
        },
        awards:{
            type: dataTypes.INTEGER,
        },
        release_date:{
            type: dataTypes.DATE,
        },
        length:{
            type: dataTypes.INTEGER,
        },
        genre_id:{
            type: dataTypes.INTEGER,
        },
    }

    let configuracionDeLaTabla = {
        tableName: 'movies', 
        timestamps: false, //Si la tabla no tiene los campos created_at y updated_at
        underscored: true, //Si los nombres de las columnas en la db tienen guiones bajos en lugar de camelCase.        
    }

   const Movie = sequelize.define(alias, columnas, configuracionDeLaTabla);

    Movie.associate = function(models){

        Movie.belongsTo(models.Genre, {
            as: "genero",
            foreignKey: "genre_id"
        })

        Movie.belongsToMany(models.Actor, {
            as:"actores",
            foreignKey: "movie_id",
            otherKey: "actor_id",
            through: "actor_movie",
            timestamps: false
        })
    }

   return Movie;
}