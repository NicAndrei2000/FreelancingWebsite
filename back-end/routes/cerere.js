const express = require("express");
const router = express.Router();
const cerereController = require("../controllers").cerere;

router.post("/", cerereController.addCerere);
router.get("/CerereDupaProiectId/:id", cerereController.getCerereByProjectId);
router.get("/", cerereController.getCerere);
router.delete("/", cerereController.deleteCereriMultiple);
router.delete("/:id", cerereController.deleteCerere);
router.patch("/", cerereController.updateCerere);

module.exports = router;
