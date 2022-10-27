const express = require('express');
const router=express.Router();
const contr=require('../controllers/kutyanev_contr');

router.get('/',contr.getKutyanevek);
router.post('/',contr.postKutyanevek);
router.patch('/',contr.patchKutyanevek);
router.delete('/',contr.deleteKutyanevek);


module.exports=router;