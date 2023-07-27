//const utilizator = require('../models/utilizator');

const utilizatoriDB = require("../models").utilizatori;
const rol_utilizatorDB = require("../models").rol_utilizatori;
const proiectDB = require("../models").proiecte;
const echipaDB = require("../models").echipe;
const facultateDB = require("../models").facultate;
const clientDB = require("../models").client;

const controller = {
  addUtilizator: (req, res) => {
    const {
      IDinstitutie,
      username,
      parola,
      nume,
      prenume,
      email,
      nrTelefon,
      tipUtilizator,
    } = req.body;
    if (tipUtilizator == "Client") {
      clientDB
        .findByPk(IDinstitutie)
        .then((client) => {
          if (client) {
            client
              .createUtilizatori_clienti({
                username,
                parola,
                nume,
                prenume,
                email,
                nrTelefon,
                tipUtilizator,
              })
              .then((utilizator) => {
                res.status(201).send(utilizator);
              })
              .catch((err) => {
                res
                  .status(500)
                  .send({ message: "Eroare de server la addUtilizatorClient" });
              });
          } else {
            res.status(404).send({ message: "Clientul nu a fost gasit!" });
          }
        })
        .catch((err) => {
          console.log(err);
          res
            .status(500)
            .send({ message: "Eroare de server la addUtilizatorClient2" });
        });
    } else if (tipUtilizator == "Profesor" || tipUtilizator == "Student") {
      facultateDB
        .findByPk(IDinstitutie)
        .then((facultate) => {
          if (facultate) {
            facultate
              .createUtilizatori_facultate({
                username,
                parola,
                nume,
                prenume,
                email,
                nrTelefon,
                tipUtilizator,
              })
              .then((utilizator) => {
                res.status(201).send(utilizator);
              })
              .catch((err) => {
                res
                  .status(500)
                  .send({ message: "Eroare de server la addUtilizator1" });
              });
          } else {
            res.status(404).send({ message: "Facultatea nu a fost gasit!" });
          }
        })
        .catch((err) => {
          console.log(err);
          res
            .status(500)
            .send({ message: "Eroare de server la addUtilizator2" });
        });
    } else if (tipUtilizator == "Admin") {
      utilizatoriDB
        .create({
          username,
          parola,
          nume,
          prenume,
          email,
          nrTelefon,
          tipUtilizator,
        })
        .then((utilizator) => {
          res.status(201).send(utilizator);
        })
        .catch((err) => {
          res
            .status(500)
            .send({ message: "Eroare de server la addUtilizator1" });
        });
    } else {
      res.status(404).send({ message: "Tipul de utilizator nu a fost gasit!" });
    }
  },
  getUtilizator: (req, res) => {
    utilizatoriDB
      .findAll({
        include: [
          { model: proiectDB, as: "Proiecte" },
          { model: echipaDB, as: "Echipe" },
        ],
      })
      .then((utilizatori) => {
        res.status(200).send(utilizatori);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Eroare server la getUtilizatori!" });
      });
  },
  getUtilizatorByID: (req, res) => {
    const id = req.params.id;

    utilizatoriDB
      .findOne({
        where: {
          id: id,
        },
      })
      .then((utilizatori) => {
        res.status(200).send(utilizatori);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Eroare server la getUtilizatori!" });
      });
  },
  deleteUtilizator: async (req, res) => {
    const id = req.params.id;
    try {
      const utilizator = await utilizatoriDB.findByPk(id);
      console.log(id);
      console.log("Aici" + utilizator);

      if (!utilizator) {
        return res
          .status(404)
          .send({ message: "Utilizatorul nu a fost gasit!" });
      }

      await utilizator.destroy();
      return res.status(200).send({ message: "Utilizatorul a fost sters!" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send({ message: "Eroare server la stergerea utilizatorului!" });
    }
  },
  updateUtilizator: async (req, res) => {
    const id = req.params.id;
    console.log(req.body);
    const {
      IDinstitutie,
      username,
      parola,
      nume,
      prenume,
      email,
      nrTelefon,
      tipUtilizator,
    } = req.body;

    try {
      const utilizator = await utilizatoriDB.findByPk(id);
      console.log("Aici " + utilizator);

      if (!utilizator) {
        return res
          .status(404)
          .send({ message: "Utilizatorul nu a fost gasit!" });
      }
      await utilizator.update({
        IDinstitutie,
        username,
        parola,
        nume,
        prenume,
        email,
        nrTelefon,
        tipUtilizator,
      });
      return res
        .status(200)
        .send({ message: "Utilizatorul a fost actualizat!" });
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Eroare server la actualizarea utilizatorului!" });
    }
  },
  verificareLogareUtilizator: async (req, res) => {
    const { usernameF, parolaF } = req.params;

    try {
      const utilizator = await utilizatoriDB.findOne({
        where: {
          username: usernameF,
          parola: parolaF,
        },
      });

      if (!utilizator) {
        return res.status(200).send("NuExista");
      }
      return res.status(200).send(utilizator);
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        message: "Eroare server la verificarea logarii utilizatorului!",
      });
    }
  },
};

module.exports = controller;
