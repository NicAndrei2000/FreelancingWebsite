const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

module.exports=(sequelize,DataType)=>{
    return sequelize.define(
        "MembriiEchipe",
        {
            nume:{
                type:DataType.STRING,
                allowNull: false,
            },
            prenume:{
                type:DataType.STRING,
                allowNull: false,
            },
            email:{
                type:DataType.STRING,
                allowNull: false
            },
            status:{
                type:DataType.STRING,
                allowNull:true,
            },
        },
        {
            tableName:"MembriiEchipa"
        }
    )
}