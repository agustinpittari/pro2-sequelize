//Creo el modelo de Follower para generar la entidad y poder utilizar los metodos create y destroy

module.exports = function(sequelize, dataTypes){

    let alias = "Seguidor";

    let cols = {
        id:{
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
        },
        seguidor:{
            type: dataTypes.INTEGER,
        },
        seguido:{
            type: dataTypes.INTEGER,
        },
    };

    let config = {
        tableName: "seguidores",
        timestamps: false
    }

    const Seguidor = sequelize.define(alias, cols, config);

    return Seguidor;

}