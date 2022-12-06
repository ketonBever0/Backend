const express = require('express');
const router=express.Router();
const controller=require("../controller/megye_controller")


router.get('/megyelista',controller.megyelista);
router.get('/megyektelepulesei/:megyenev',controller.megyeTelepulesei);


module.exports=router;