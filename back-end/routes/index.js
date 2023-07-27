const express=require('express');
const router=express.Router();
const otherRouter=require('./others');
const utilizatorRouter=require('./utilizator');
const proiectRouter=require('./proiect');
const echipaRouter=require('./echipa');
const membruEchipaRouter=require('./membruEchipa');
const facultateRouter=require('./facultate');
const clientRouter=require('./client');
const cerereRouter=require('./cerere');

router.use('/',otherRouter);
router.use('/utilizatori',utilizatorRouter);
router.use('/proiecte',proiectRouter);
router.use('/echipe',echipaRouter);
router.use('/membriiEchipe',membruEchipaRouter);
router.use('/facultati',facultateRouter);
router.use('/clienti',clientRouter);
router.use('/cereri',cerereRouter);

module.exports=router;