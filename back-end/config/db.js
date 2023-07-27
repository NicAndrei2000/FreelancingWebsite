const Sequelize=require('sequelize');
const sequelize=new Sequelize('aplicatie_freelancing','root','',{
    dialect:'mysql',
    host:'localhost',
    define:{
        timestamps: true,
    }
});

module.exports=sequelize;