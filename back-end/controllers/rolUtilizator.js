const utilizatoriDB=require('../models').utilizatori;
const rol_utilizatorDB=require('../models').rol_utilizatori;

const controller={
    addRolUtilizator:(req,res)=>{
        const {denumire_rol,isActive}=req.body;
        rol_utilizatorDB.create({denumire_rol,isActive}).then((rolUtilizator)=>{
            res.status(201).send(rolUtilizator);
            console.log("Am adaugat cu succes un rol de utilizator!");
        }).catch((err)=>{
            console.log(err);
            res.status(500).send({message:"Eroare la adaugarea rolului de utilizator!"});
        })
    },
   getRolUtilizator:(req,res)=>{
    rol_utilizatorDB.findAll({include:[{model:utilizatoriDB,as:'Utilizatori'}]})
    .then((roluriUtilizatori)=>{
        res.status(200).send(roluriUtilizatori);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({message:"Eroare server la getRolUtilizatori!"});
    })
   }
}

module.exports=controller;