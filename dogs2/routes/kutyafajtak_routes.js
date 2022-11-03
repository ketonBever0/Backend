const express = require('express');
const kutyafajtakRouter=express.Router();
const contr=require('../controllers/kutyafajta_contr');

kutyafajtakRouter.get('/kutyafajtak',contr.getKutyafajtak)

module.exports=kutyafajtakRouter;