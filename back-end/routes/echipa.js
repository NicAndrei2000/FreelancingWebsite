const express=require("express");
const router=express.Router();
const echipaController=require('../controllers').echipa

router.post('/',echipaController.addEchipa);
router.get('/',echipaController.getEchipa);
router.get('/primeleCinciEchipe',echipaController.primeleCinciEchipe);
router.get('/:id',echipaController.getEchipaById);
router.get('/findEchipaByUtilizator/:id',echipaController.findEchipaByUtilizatorId);
router.patch("/updateEchipa/:id", echipaController.updateNrProiecte);



module.exports=router;