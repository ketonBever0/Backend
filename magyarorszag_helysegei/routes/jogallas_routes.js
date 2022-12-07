const express = require('express');
const router = express.Router();
const controller = require('../controller/jogallas_controller');

router.get('/',controller.jogallasLista);
router.get('/jogallas/:jogallas',controller.jogallasTelepulesei);



module.exports=router;