module.exports=(sequelize,DataType)=>{
    return sequelize.define(
        "Proiecte",
        {
            numeProiect:{
                type:DataType.STRING,
                allowNull: false,
            },
            detaliiCompanie:{
                type:DataType.TEXT('long'),
                allowNull:false,
            },
            rezumatProiect:{
                type:DataType.TEXT('long'),
                allowNull:false
            },
            descriereProiectDetaliat:{
                type:DataType.TEXT('long'),
                allowNull:false
            },
            tipuriTehnologii:{
                type:DataType.TEXT('long'),
                allowNull:false
            },
            termenLimitaProiect:{
                type:DataType.TEXT('long'),
                allowNull:false
            },
            comunicareProiect:{
                type:DataType.TEXT('long'),
                allowNull:false
            },
            experientaEchipa:{
                type:DataType.TEXT('long'),
                allowNull:false
            },
            categorieProiect:{
                type:DataType.STRING,
                allowNull: false,
            },
            imagineFundal:{
                type:DataType.BLOB('long'),
                allowNull:true
            },
            esteAles:{
                type:DataType.STRING,
                allowNull:true
            },
            rezultatGit:{
                type:DataType.TEXT('long'),
                allowNull:true
            },
            apreciat:{
                type:DataType.STRING,
                allowNull:true,
                defaultValue:"Nimic"
            }
        },
        {
            tableName:"Proiecte",
        }
    );
};
