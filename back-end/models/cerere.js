const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

module.exports=(sequelize,DataType)=>{

    return sequelize.define(
        "Cereri",
        {
            status:{
                type:DataType.STRING,
                allowNull:false,
            },
            SelectedTeam:{
                type:DataType.INTEGER,
                allowNull:true,
            }
        },
        {
            tableName:"Cereri"
        }
    )

}