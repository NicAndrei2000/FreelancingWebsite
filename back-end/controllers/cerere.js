const proiecteDB = require("../models").proiecte;
const echipeDB = require("../models").echipe;
const cereriDB = require("../models").cereri;

const controller = {
  addCerere: (req, res) => {
    const { ProiecteId, EchipeId, status, SelectedTeam } = req.body;
    cereriDB
      .create({ ProiecteId, EchipeId, status, SelectedTeam })
      .then((cerere) => {
        res.status(201).send(cerere);
        console.log("Am adaugat cu succes cererea!");
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Eroare la adaugarea cererii!" });
      });
  },
  getCerere: (req, res) => {
    cereriDB
      .findAll()
      .then((cerere) => {
        res.status(200).send(cerere);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Eroare server la getcererii!" });
      });
  },
  deleteCereriMultiple: async (req, res) => {
    const ids = req.body.ids;
    try {
      const cereri = await cereriDB.findAll({
        where: {
          id: ids,
        },
      });

      if (cereri.length === 0) {
        return res.status(404).send({ message: "cerere nu a fost gasit!" });
      }

      await cereriDB.destroy({
        where: {
          id: ids,
        },
      });
      return res.status(200).send({ message: "cerere a fost sters!" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send({ message: "Eroare server la stergerea cerere!" });
    }
  },
  deleteCerere: async (req, res) => {
    const id = req.params.id;
    try {
      const cerere = await cereriDB.findByPk(id);
      console.log("ID-ul este:" + id);
      // console.log("Aici"+cerere);

      if (!cerere) {
        return res.status(404).send({ message: "cerere nu a fost gasit!" });
      }

      await cerere.destroy();
      return res.status(200).send({ message: "cerere a fost sters!" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send({ message: "Eroare server la stergerea cerere!" });
    }
  },
  updateCerere: async (req, res) => {
    const { idEchipa, idProiect, status } = req.body;

    try {
      const cerere = await cereriDB.findOne({
        where: {
          EchipeId: idEchipa,
          ProiecteId: idProiect,
        },
      });

      if (!cerere) {
        return res.status(404).send({ message: "Cererea nu a fost gasita!" });
      }

      cerere.status = status;
      cerere.SelectedTeam = idEchipa;
      await cerere.save();

      return res.status(200).send(cerere);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send({ message: "Eroare server la actualizarea cerere!" });
    }
  },
  getCerereByProjectId: async (req, res) => {
    const idProiect = req.params.id;

    try {
      const cerere = await cereriDB.findOne({
        where: {
          ProiecteId: idProiect,
        },
      });

      if (!cerere) {
        return res.status(404).send({ message: "Cererea nu a fost gasita!" });
      }
      return res.status(200).send(cerere);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send({ message: "Eroare server la get cerereByProiect!" });
    }
  },
};
module.exports = controller;
