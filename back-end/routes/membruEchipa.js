const express=require("express");
const router=express.Router();
const membruEchipaController=require('../controllers').membruEchipa;

router.post('/',membruEchipaController.addMembruEchipa);
router.get('/',membruEchipaController.getMembruEchipa);
router.get('/:idUser',membruEchipaController.getMembruByUser);
router.patch('/',membruEchipaController.updateMembruEchipa);
router.delete('/:id',membruEchipaController.deleteMembruEchipa);
module.exports=router;