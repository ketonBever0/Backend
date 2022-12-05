const express=require('express');
const router=express.Router();
const {getKutyanevek,postKutyanev,patchKutyanev,deleteKutyanev}=require('../controllers/kutyanevController');

router.get('/',getKutyanevek);
router.post('/',postKutyanev);
router.patch('/',patchKutyanev);
router.delete('/',deleteKutyanev);


module.exports=router;