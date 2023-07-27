const express=require("express");
const router=express.Router();
const facultateController=require('../controllers').facultate;

router.post('/',facultateController.addFacultate);
router.get('/',facultateController.getFacultate);
router.delete('/:id',facultateController.deleteFacultate);


module.exports=router;