const Sequelize=require('sequelize');
const db=require('../config/db');

const utilizatorModel=require("./utilizator");
const proiectModel=require("./proiect");
const echipaModel=require('./echipa');
const membruEchipaModel=require('./membru_echipa');
const clientModel=require('./client');
const facultateModel=require('./facultate');
const cerereModel=require('./cerere');

const utilizatori=utilizatorModel(db,Sequelize);
const proiecte=proiectModel(db,Sequelize);
const echipe=echipaModel(db,Sequelize);
const membru_echipa=membruEchipaModel(db,Sequelize);
const client=clientModel(db,Sequelize);
const facultate=facultateModel(db,Sequelize);
const cereri=cerereModel(db,Sequelize);


//legaturi

utilizatori.hasMany(proiecte,{
    foreignKey:'UtilizatoriId',
    as:"Proiecte",
    onDelete:"CASCADE",
});
proiecte.belongsTo(utilizatori);

utilizatori.hasOne(echipe,{
    foreignKey:"E_UtilizatoriId",
    as:"Echipe",
    onDelete:"CASCADE",
})
echipe.belongsTo(utilizatori,{
    foreignKey:"Echipe_UtilId",
    as:"Utilizator",
    onDelete:"CASCADE",

});

echipe.hasMany(membru_echipa,{
    foreignKey:"EchipaId",
    as:"Membrii_Echipa_E",
    onDelete:"CASCADE",
});
membru_echipa.belongsTo(echipe);

utilizatori.hasOne(membru_echipa,{
    foreignKey:"ME_UtilizatorId",
    as:"Membrii_Echipa_U",
    onDelete:"CASCADE"
});
membru_echipa.belongsTo(utilizatori,{
    foreignKey:"ME_UtilizatorId",
    as:"Membrii_Echipa_Ut",
    onDelete:"CASCADE",
});

client.hasMany(utilizatori,{
    foreignKey:"IDinstitutie",
    as:"Utilizatori_clienti",
    onDelete:"CASCADE",
    scope:{
        tipUtilizator:'Client'
    }
});
utilizatori.belongsTo(client,{
    foreignKey:"IDinstitutie",
    scope:{
        tipUtilizator:'Client',
    }
});

facultate.hasMany(utilizatori,{
    foreignKey:"IDinstitutie",
    as:"Utilizatori_facultate",
    onDelete:"CASCADE",
    // scope:{
    //     tipUtilizator:'Profesor',
    // }
});
utilizatori.belongsTo(facultate,{
    foreignKey:"IDinstitutie",
    // scope:{
    //     tipUtilizator:'Profesor',
    // }
});

proiecte.hasMany(cereri,{
    foreignKey:"ProiecteId",
    as:"Cereri_proiece",
    onDelete:"CASCADE"
});
cereri.belongsTo(proiecte);

echipe.hasMany(cereri,{
    foreignKey:"EchipeId",
    as:"Cereri_echipa",
    onDelete:"CASCADE",

});
cereri.belongsTo(echipe);


module.exports={
    utilizatori,
    proiecte,
    echipe,
    membru_echipa,
    facultate,
    client,
    cereri,
    connection: db,
};