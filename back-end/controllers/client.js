const clientDB=require('../models').client;
const utilizatoriDB=require('../models').utilizatori;

const controller={

    addClient:(req,res)=>{
        const {nume,numarIdentificator,codAcces,contact,email}=req.body;
        clientDB.create({nume,numarIdentificator,codAcces,contact,email}).then((client)=>{
            res.status(201).send(client);
            console.log("Am adaugat cu succes clientului!");
        }).catch((err)=>{
            console.log(err);
            res.status(500).send({message:"Eroare la adaugarea clientului!"});
        })
    },
    getClient:(req,res)=>{
        clientDB.findAll({include:[{model:utilizatoriDB,as:'Utilizatori_clienti'}]})
        .then((client)=>{
            res.status(200).send(client);
        }).catch((err)=>{
            console.log(err);
            res.status(500).send({message:"Eroare server la getClient!"});
        })
    },
    deleteClient: async (req,res)=>{
        const id=req.params.id;
        try {
            const client = await clientDB.findByPk(id);

            if (!client) {
              return res.status(404).send({ message: 'Clientul nu a fost gasit!' });
            }
          
            await client.destroy();
            return res.status(200).send({ message: 'Clientul a fost sters!' });
          } catch (error) {
            console.error(error);
            return res.status(500).send({ message: 'Eroare server la stergerea Clientului!' });
          }
    },
}

module.exports=controller;

