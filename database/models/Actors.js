module.exports = function(sequelize, dataTypes){

    alias = "Actor"

    cols = {
        id:{
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
        },
        first_name:{
            type: dataTypes.STRING,
        },
        last_name:{
            type: dataTypes.STRING,
        },
        rating:{
            type: dataTypes.INTEGER,
        }
    }

    config = {
        timestamps:false,
        underscored:true,
        tableName: "Actors"
    }

    const Actor = sequelize.define(alias, cols, config)

    Actor.associate = function(models){
        Actor.belongsToMany(models.Movie, {
            as:"movies",
            foreignKey: "actor_id",
            otherKey: "movie_id",
            through: "actor_movie",
            timestamps: false,
        })
    }

    return Actor
}