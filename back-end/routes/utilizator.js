const express = require("express");
const router = express.Router();
const utilizatorController = require("../controllers").utilizator;

router.post("/", utilizatorController.addUtilizator);
router.get("/", utilizatorController.getUtilizator);
router.get("/:id", utilizatorController.getUtilizatorByID);
router.delete("/:id", utilizatorController.deleteUtilizator);
router.put("/:id", utilizatorController.updateUtilizator);
router.get(
  "/verificareLogareUtilizator/:usernameF/:parolaF",
  utilizatorController.verificareLogareUtilizator
);

module.exports = router;
