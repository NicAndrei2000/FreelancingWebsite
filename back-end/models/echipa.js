const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

module.exports=(sequelize,DataType)=>{
    return sequelize.define(
        "Echipe",
        {
            nume_echipa:{
                type:DataType.STRING,
                allowNull: false,
            },
            facultate_apartinatoare:{
                type:DataType.STRING,
                allowNull: false,
            },
            specializare_echipa:{
                type:DataType.STRING,
                allowNull: false,
            },
            descriere:{
                type:DataType.STRING,
                allowNull: false,
            },
            contact:{
                type:DataType.STRING,
                allowNull:false,
            },
            nrProiecteRealizate:{
                type:DataType.INTEGER,
                allowNull:true,
                defaultValue:0,
            }
        },
        {
            tableName:"Echipe"
        }

    );
};