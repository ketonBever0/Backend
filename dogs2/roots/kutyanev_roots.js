const express = require('express');
const router=express.Router();
const contr=require('../controllers/kutyanev_contr');

router.get('/',contr.getKutyanevek);
router.post('/',contr.postKutyanevek);
router.patch('/:id',contr.patchKutyanevek);
router.delete('/:id',contr.deleteKutyanevek);


module.exports=router;