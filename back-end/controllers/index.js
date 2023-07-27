const other=require('./other');
const utilizator=require('./utilizator');
const rol_utilizator=require('./rolUtilizator');
const proiect=require('./proiect');
const echipa=require('./echipa');
const membruEchipa=require('./membruEchipa');
const facultate=require('./facultate');
const client=require('./client');
const cerere=require('./cerere');

const controllers={
    other,utilizator,rol_utilizator,proiect,echipa,membruEchipa,facultate,client,cerere
};

module.exports=controllers;