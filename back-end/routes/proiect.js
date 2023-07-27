const express = require("express");
const router = express.Router();
const proiectController = require("../controllers").proiect;
const upload = require("../middlewares/multer");
const proiecteDB = require("../models").proiecte;
const utilizatoriDB = require("../models").utilizatori;
const { Blob } = require("buffer");
const { type } = require("os");

router.post("/", upload.single("imagineFundal"), (req, res) => {
  const {
    UtilizatoriId,
    numeProiect,
    detaliiCompanie,
    rezumatProiect,
    descriereProiectDetaliat,
    tipuriTehnologii,
    termenLimitaProiect,
    comunicareProiect,
    experientaEchipa,
    categorieProiect,
    esteAles,
    rezultatGit,
  } = req.body;
  console.log(req.file);
  utilizatoriDB
    .findOne({
      where: {
        id: UtilizatoriId,
        // tipUtilizator: 'Client',
      },
    })
    .then((utilizator) => {
      if (utilizator) {
        utilizator
          .createProiecte({
            numeProiect,
            detaliiCompanie,
            rezumatProiect,
            descriereProiectDetaliat,
            tipuriTehnologii,
            termenLimitaProiect,
            comunicareProiect,
            experientaEchipa,
            categorieProiect,
            imagineFundal: req.file.buffer,
            esteAles,
            rezultatGit,
          })
          .then((utilizator) => {
            res.status(201).send(utilizator);
          })
          .catch((err) => {
            res
              .status(500)
              .send({ message: "Eroare de server la addProiect1" });
          });
      } else {
        res.status(404).send({
          message:
            "Rolul de utilizator nu exista sau utilizatorul nu are rolul de client(addProiect)",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: "Eroare de server la addProiect" });
    });
});
router.get("/", proiectController.getUtilizator);
router.get("/:id", proiectController.getUtilizatorById);
router.patch("/", proiectController.updateProiecte);
router.patch("/raspuns", proiectController.updateProiecteRaspuns);
router.patch("/updateApreciat", proiectController.updateApreciat);
router.get("/echipa/:id", proiectController.getAcceptedProjectByUserID);

module.exports = router;
