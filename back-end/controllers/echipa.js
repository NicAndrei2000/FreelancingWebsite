const utilizatoriDB = require("../models").utilizatori;
const echipaDB = require("../models").echipe;
const rol_utilizatorDB = require("../models").rol_utilizatori;
const membriiEchipaDB = require("../models").membru_echipa;

const controller = {
  addEchipa: (req, res) => {
    const {
      E_UtilizatoriId,
      nume_echipa,
      facultate_apartinatoare,
      specializare_echipa,
      descriere,
      contact,
    } = req.body;
    utilizatoriDB
      .findOne({
        where: {
          id: E_UtilizatoriId,
        },
      })
      .then((utilizator) => {
        if (utilizator) {
          utilizator.getEchipe().then((echipe) => {
            if (echipe != null) {
              res
                .status(400)
                .send({ message: "Utilizatorul are deja o echipa" });
            } else {
              utilizator
                .createEchipe({
                  nume_echipa,
                  facultate_apartinatoare,
                  specializare_echipa,
                  descriere,
                  contact,
                })
                .then((utilizator) => {
                  res.status(201).send(utilizator);
                })
                .catch((err) => {
                  res
                    .status(500)
                    .send({ message: "Eroare de server la addEchipa" });
                });
            }
          });
        } else {
          res
            .status(404)
            .send({
              message:
                "Rolul de utilizator nu exista sau utilizatorul nu are rolul de profesor(addEchipa)",
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Eroare de server la addEchipa" });
      });
  },
  getEchipa: (req, res) => {
    echipaDB
      .findAll()
      .then((echipe) => {
        res.status(200).send(echipe);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Eroare server la getEchipe!" });
      });
  },
  // getEchipaById: async (req, res) => {
  //     const id = req.params.id;
  //     try {
  //       const echipa = await echipaDB.findByPk(id);

  //       if (!echipa) {
  //         return res
  //           .status(404)
  //           .send({ message: "Echipa nu a fost gasit!" });
  //       }
  //       return res.status(200).send(echipa);
  //     } catch (error) {
  //       console.error(error);
  //       return res
  //         .status(500)
  //         .send({ message: "Eroare server la cautarea dupa ID a echipei!" });
  //     }
  //   },
  //   getEchipaById: async (req, res) => {
  //     const idUser = req.params.id;
  //     try {
  //       const echipa = await echipaDB.findOne({
  //         where:{
  //             E_UtilizatoriId:idUser
  //         }
  //       });

  //       if (!echipa) {
  //         return res
  //           .status(404)
  //           .send({ message: "Echipa nu a fost gasit!" });
  //       }
  //       return res.status(200).send(echipa);
  //     } catch (error) {
  //       console.error(error);
  //       return res
  //         .status(500)
  //         .send({ message: "Eroare server la cautarea dupa ID a echipei!" });
  //     }
  //   },
  getEchipaById: async (req, res) => {
    const idUser = req.params.id;
    try {
      const echipa = await echipaDB.findOne({
        where: {
          E_UtilizatoriId: idUser,
        },
      });

      if (!echipa) {
        return res.status(404).send({ message: "Echipa nu a fost gasit!" });
      }

      const membriiAsteptare = await membriiEchipaDB.findAll({
        where: {
          status: "Asteptare",
          EchipaId: echipa.id,
        },
      });

      const membriiInscris = await membriiEchipaDB.findAll({
        where: {
          status: "Inscris",
          EchipaId: echipa.id,
        },
      });

      return res.status(200).send({ echipa, membriiAsteptare, membriiInscris });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send({ message: "Eroare server la cautarea dupa ID a echipei!" });
    }
  },
  findEchipaByUtilizatorId: async (req, res) => {
    const idUser = req.params.id;

    try {
      const echipa = await echipaDB.findOne({
        where: {
          E_UtilizatoriId: idUser,
        },
      });

      if (!echipa) {
        return res.status(200).send("NuExista");
      }

      return res.status(200).send(echipa);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send({ message: "Eroare server la cautarea dupa ID a echipei!" });
    }
  },
  updateNrProiecte: async (req, res) => {
    const idEchipa = req.params.id;

    try {
      const echipa = await echipaDB.findOne({
        where: {
          id: idEchipa,
        },
      });

      if (!echipa) {
        return res
          .status(404)
          .send({ message: "Nu s a gasit echipa la addNrProiecte!" });
      }
      echipa.nrProiecteRealizate = echipa.nrProiecteRealizate + 1;
      await echipa.save();
      return res.status(200).send(echipa);
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .send({ message: "Eroare server la actualizarea de echipa!" });
    }
  },
  // primeleCinciEchipe:(req,res)=>{

  //     echipaDB.findAll()
  //     .then((echipe) => {
  //       const echipeSort = echipe.sort((a, b) => b.nrProiecteRealizate - a.nrProiecteRealizate);
  //       const primeleCinciEchipe = echipeSort.slice(0, 5);
  //       return res.status(200).send(primeleCinciEchipe);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       return res.status(500).send({ message: "Eroare server la getEchipe!" });
  //     });

  // },
  // primeleCinciEchipe: (req, res) => {
  //   echipaDB.findAll()
  //     .then((echipe) => {
  //       const totalProjects = echipe.reduce((acc, echipa) => acc + echipa.nrProiecteRealizate, 0);
  //       const echipeWithPercentage = echipe.map((echipa) => ({
  //         numeEchipa: echipa.nume_echipa,
  //         percentage: (echipa.nrProiecteRealizate / totalProjects) * 100
  //       }));
  //       const sortedEchipe = echipeWithPercentage.sort((a, b) => b.percentage - a.percentage);
  //       const primeleCinciEchipe = sortedEchipe.slice(0, 5);
  //       return res.status(200).send(primeleCinciEchipe);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       return res.status(500).send({ message: "Eroare server la getEchipe!" });
  //     });
  // },
  primeleCinciEchipe: (req, res) => {
    echipaDB
      .findAll()
      .then((echipe) => {
        const totalProjects = echipe.reduce(
          (acc, echipa) => acc + echipa.nrProiecteRealizate,
          0
        );
        const sortedEchipe = echipe.sort(
          (a, b) => b.nrProiecteRealizate - a.nrProiecteRealizate
        );
        const primeleCinciEchipe = sortedEchipe.slice(0, 5);
        const nrEchipe = echipe.length;
        const echipeWithPercentage = primeleCinciEchipe.map((echipa) => ({
          numeEchipa: echipa.nume_echipa,
          percentage: (echipa.nrProiecteRealizate / totalProjects) * 100,
        }));
        return res.status(200).send({ echipeWithPercentage, nrEchipe });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send({ message: "Eroare server la getEchipe!" });
      });
  },
};

module.exports = controller;
