const express=require("express");
const router=express.Router();
const clientController=require('../controllers').client;

router.post('/',clientController.addClient);
router.get('/',clientController.getClient);
router.delete('/:id',clientController.deleteClient);

module.exports=router;