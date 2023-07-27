const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

module.exports=(sequelize,DataType)=>{
    return sequelize.define(
        "Clienti",
        {
            nume:{
                type:DataType.STRING,
                allowNull:false,
            },
            numarIdentificator:{
                type:DataType.STRING,
                allowNull:false,
            },
            codAcces:{
                type:DataType.STRING,
                allowNull:false,
            },
            contact:{
                type:DataType.STRING,
                allowNull:false,
            },
            email:{
                type:DataType.STRING,
                allowNull:false,
            },
        },
        {
            tableName:"Clienti"
        }
    )
}