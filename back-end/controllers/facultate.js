const utilizatoriDB=require('../models').utilizatori;
const echipaDB=require('../models').echipe;
const facultateDB=require('../models').facultate;

const controller={

    addFacultate:(req,res)=>{
        const {nume,numarIdentificator,codAcces,contact,email}=req.body;
        facultateDB.create({nume,numarIdentificator,codAcces,contact,email}).then((facultate)=>{
            res.status(201).send(facultate);
            console.log("Am adaugat cu succes facultatea!");
        }).catch((err)=>{
            console.log(err);
            res.status(500).send({message:"Eroare la adaugarea facultatii!"});
        })
    },
    getFacultate:(req,res)=>{
        facultateDB.findAll({include:[{model:utilizatoriDB,as:'Utilizatori_facultate'}]})
        .then((facultate)=>{
            res.status(200).send(facultate);
        }).catch((err)=>{
            console.log(err);
            res.status(500).send({message:"Eroare server la getFacultate!"});
        })
    },
    deleteFacultate: async (req,res)=>{
        const id=req.params.id;
        try {
            const facultate = await facultateDB.findByPk(id);
            console.log(id);
            console.log("Aici"+facultate);

            if (!facultate) {
              return res.status(404).send({ message: 'Facultatea nu a fost gasit!' });
            }
          
            await facultate.destroy();
            return res.status(200).send({ message: 'Facultatea a fost sters!' });
          } catch (error) {
            console.error(error);
            return res.status(500).send({ message: 'Eroare server la stergerea facultatea!' });
          }
    },
}



module.exports=controller;