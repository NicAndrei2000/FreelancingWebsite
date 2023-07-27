const utilizator = require("../models/utilizator");
const Sequelize = require("sequelize");

const membru_echipaDB = require("../models").membru_echipa;
const echipaDB = require("../models").echipe;
const utilizatoriDB = require("../models").utilizatori;

const controller = {
  // addMembruEchipa:(req,res)=>{
  //     const {ME_UtilizatorId,EchipaId}=req.body;

  //     membru_echipaDB
  //     .findOne({ where: { ME_UtilizatorId, EchipaId } }) // Check if a row already exists
  //     .then((existingRow) => {
  //       if (existingRow) {
  //         // A row already exists, send a response indicating the duplicate entry
  //         res.status(409).send({ message: "Duplicate entry" });
  //       } else{

  //       }

  //     utilizatoriDB.findByPk(ME_UtilizatorId).then((utilizator)=>{
  //         if(utilizator){

  //             membru_echipaDB.create({
  //                 ME_UtilizatorId:ME_UtilizatorId,
  //                 EchipaId:EchipaId,
  //                 nume:utilizator.nume,
  //                 prenume:utilizator.prenume,
  //                 email:utilizator.email,
  //                 status:"Asteptare",
  //             }).then((membriiEchipa)=>{
  //                 res.status(201).send(membriiEchipa);
  //             }).catch((err)=>{
  //                 res.status(500).send({message:"Eroare de server la addMembruEchipa1"});
  //             });
  //         }else{
  //             res.status(404).send({message:"Utilizatorul nu exista"});
  //         }
  //     }).catch((err)=>{
  //         res.status(500).send({message:"Eroare de server la addMembruEchipa2"});
  //     });
  // },
  addMembruEchipa: (req, res) => {
    const { ME_UtilizatorId, EchipaId } = req.body;

    membru_echipaDB
      .findOne({ where: { ME_UtilizatorId, EchipaId } }) // Check if a row already exists
      .then((existingRow) => {
        if (existingRow) {
          // A row already exists, send a response indicating the duplicate entry
          res.status(201).send("ExistaDeja");
        } else {
          // Create a new row
          utilizatoriDB
            .findByPk(ME_UtilizatorId)
            .then((utilizator) => {
              if (utilizator) {
                membru_echipaDB
                  .create({
                    ME_UtilizatorId: ME_UtilizatorId,
                    EchipaId: EchipaId,
                    nume: utilizator.nume,
                    prenume: utilizator.prenume,
                    email: utilizator.email,
                    status: "Asteptare",
                  })
                  .then((membriiEchipa) => {
                    res.status(201).send(membriiEchipa);
                  })
                  .catch((err) => {
                    res.status(500).send({
                      message: "Eroare de server la addMembruEchipa1",
                    });
                  });
              } else {
                res.status(404).send({ message: "Utilizatorul nu exista" });
              }
            })
            .catch((err) => {
              res
                .status(500)
                .send({ message: "Eroare de server la addMembruEchipa2" });
            });
        }
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: "Eroare de server la addMembruEchipa2" });
      });
  },

  getMembruEchipa: (req, res) => {
    membru_echipaDB
      .findAll()
      .then((membri_echipa) => {
        res.status(200).send(membri_echipa);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Eroare server la getMembruEchipa!" });
      });
  },
  getMembruByUser: (req, res) => {
    const { idUser } = req.params;
  
    membru_echipaDB
      .findOne({
        where: {
          ME_UtilizatorId: idUser,
          status: "Inscris",
        },
      })
      .then((membru_echipa) => {
        if (membru_echipa) {
          const { EchipaId } = membru_echipa;
          echipaDB
            .findByPk(EchipaId)
            .then((echipa) => {
              if (echipa) {
                res.status(200).send(echipa);
              } else {
                res.status(404).send({ message: "Echipa nu a fost gasita!" });
              }
            })
            .catch((err) => {
              console.log(err);
              res.status(500).send({ message: "Eroare server la getEchipaByMembru!" });
            });
        } else {
          res.status(200).send("NuAreEchipa");
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Eroare server la getMembruEchipa!" });
      });
  },  
  updateMembruEchipa: async (req, res) => {
    const { id, status, IdUtil } = req.body;

    try {
      const membru = await membru_echipaDB.findByPk(id);

      if (!membru) {
        return res.status(404).send({ message: "Membrul nu a fost gasit!" });
      }

      membru.status = status;
      await membru.save();

      await membru_echipaDB.destroy({
        where: {
          ME_UtilizatorId: IdUtil,
          id: { [Sequelize.Op.ne]: id },
        },
      });

      return res.status(200).send(membru);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send({ message: "Eroare server la actualizarea membru echipa!" });
    }
  },
  deleteMembruEchipa: async (req, res) => {
    const id = req.params.id;
    try {
      const membru = await membru_echipaDB.findByPk(id);
      console.log("ID-ul este:" + id);
      // console.log("Aici"+cerere);

      if (!membru) {
        return res.status(404).send({ message: "Membrul nu a fost gasit!" });
      }

      await membru.destroy();
      return res.status(200).send({ message: "Membrul a fost sters!" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send({ message: "Eroare server la stergerea membru!" });
    }
  },
};

module.exports = controller;
