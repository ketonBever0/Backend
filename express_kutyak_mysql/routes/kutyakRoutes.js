const express=require('express');
const router=express.Router();
const kutyaController = require('../controllers/kutyaController');

router.get('/',kutyaController.getKutyak);
router.get('/:searchname',kutyaController.getKutyakByName);
router.get('/breed/:searchbreed',kutyaController.getKutyakByBreed);
router.get('/age/:searchminage-:searchmaxage',kutyaController.getKutyakByAge);
router.post('/',kutyaController.postKutyak);
router.patch('/',kutyaController.patchKutyak);
router.delete('/',kutyaController.deleteKutyak);

module.exports =router;