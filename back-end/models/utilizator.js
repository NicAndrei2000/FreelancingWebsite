module.exports=(sequelize,DataType) =>{
    return sequelize.define(
        "Utilizatori",
        {
            username:{
                type:DataType.STRING,
                allowNull: false,
            },
            parola:{
                type:DataType.STRING,
                allowNull: false
            },
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
                allowNull: false,
            },
            nrTelefon:{
                type:DataType.STRING,
                allowNull: false,
            },
            tipUtilizator:{
                type:DataType.STRING,
                allowNull:false,
            }
        },
        {
            tableName:"Utilizatori",
        }
    );
};