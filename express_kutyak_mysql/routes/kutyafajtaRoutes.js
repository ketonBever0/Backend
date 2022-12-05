const express=require('express');
const router=express.Router();
const {getKutyafajtak,postKutyafajta,patchKutyafajta,deleteKutyafajta}= require('../controllers/kutyafajtaController');

router.get('/',getKutyafajtak);
router.post('/',postKutyafajta);
router.patch('/',patchKutyafajta);
router.delete('/',deleteKutyafajta);

module.exports =router;
