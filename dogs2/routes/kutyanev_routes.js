const express = require('express');
const kutyanevekRouter=express.Router();
const contr=require('../controllers/kutyanev_contr');

kutyanevekRouter.get('/kutyanevek',contr.getKutyanevek);
kutyanevekRouter.post('/kutyanevek',contr.postKutyanevek);
kutyanevekRouter.patch('/kutyanevek/:id',contr.patchKutyanevek);
kutyanevekRouter.delete('/kutyanevek/:id',contr.deleteKutyanevek);


module.exports=kutyanevekRouter;