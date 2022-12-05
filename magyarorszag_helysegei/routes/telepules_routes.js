const express = require('express');
const router=express.Router();
const controller = require('../controller/telepules_controller');


router.get('/',controller.getTelepulesek)
router.get('/:nev',controller.getTelepulesByName)



module.exports=router;