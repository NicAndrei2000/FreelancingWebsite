const { membru_echipa, cereri } = require("../models");
const echipaDB = require("../models").echipe;

const rol_utilizator = require("../models").rol_utilizatori;

const proiecteDB = require("../models").proiecte;
const cereriDB = require("../models").cereri;
const membriiEchipeDB = require("../models").membru_echipa;

const controller = {
  getUtilizator: (req, res) => {
    proiecteDB
      .findAll()
      .then((proiecte) => {
        res.status(200).send(proiecte);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Eroare server la getProiecte!" });
      });
  },
  getUtilizatorById: async (req, res) => {
    const id = req.params.id;
    try {
      const utilizator = await proiecteDB.findByPk(id);
      console.log(id);
      console.log("Aici" + utilizator);

      if (!utilizator) {
        return res
          .status(404)
          .send({ message: "Utilizatorul nu a fost gasit!" });
      }
      return res.status(200).send(utilizator);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send({ message: "Eroare server la stergerea utilizatorului!" });
    }
  },

  getPoriecte: (req, res) => {
    proiecteDB
      .findAll()
      .then((proiecte) => {
        res.status(200).send(proiecte);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Eroare server la getProiecte!" });
      });
  },
  getAcceptedProjectByUserID: async (req, res) => {
    const idUser = req.params.id;

    // Find user type

    const membruEchipe = await membriiEchipeDB.findOne({
      where: {
        ME_UtilizatorId: idUser,
      },
    });
    const echipa = await echipaDB.findOne({
      where: {
        E_UtilizatoriId: idUser,
      },
    });

    if (membruEchipe) {
      const cereri = await cereriDB
        .findAll({
          where: {
            EchipeId: membruEchipe?.dataValues.EchipaId,
            status: "Acceptat",
          },

          include: {
            model: proiecteDB,
          },
        })
        .then((projects) => {
          res.status(200).send(projects);
        });
    } else {
      if (echipa) {
        const cereri = await cereriDB
          .findAll({
            where: {
              EchipeId: echipa?.dataValues.id,
              status: "Acceptat",
            },

            include: {
              model: proiecteDB,
            },
          })
          .then((projects) => {
            res.status(200).send(projects);
          });
      } else {
        res.status(500).send({ message: "Eroare la gasire echipa" });
      }
    }
  },
  updateProiecte: async (req, res) => {
    const { id, esteAles } = req.body;

    try {
      const proiect = await proiecteDB.findByPk(id);

      if (!proiect) {
        return res.status(404).send({ message: "Proiectul nu a fost gasit!" });
      }

      proiect.esteAles = esteAles;
      await proiect.save();

      return res.status(200).send(proiect);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send({ message: "Eroare server la actualizarea proiectului!" });
    }
  },
  updateProiecteRaspuns: async (req, res) => {
    const { id, rezultatGit } = req.body;
    console.log(
      "🚀 ~ file: proiect.js:129 ~ updateProiecteRaspuns: ~ rezultatGit:",
      rezultatGit
    );

    try {
      const proiect = await proiecteDB.findByPk(id);

      if (!proiect) {
        return res.status(404).send({ message: "Proiectul nu a fost gasit!" });
      }

      proiect.rezultatGit = rezultatGit;
      await proiect.save();

      return res.status(200).send(proiect);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send({ message: "Eroare server la actualizarea proiectului!" });
    }
  },

  updateApreciat: async (req, res) => {
    const { id, apreciat } = req.body;

    try {
      const proiect = await proiecteDB.findByPk(id);

      if (!proiect) {
        return res.status(404).send({ message: "Proiectul nu a fost gasit!" });
      }

      proiect.apreciat = apreciat;
      await proiect.save();

      return res.status(200).send(proiect);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send({ message: "Eroare server la actualizarea proiectului!" });
    }
  },
};

module.exports = controller;
