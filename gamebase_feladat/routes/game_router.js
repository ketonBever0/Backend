const express = require('express');
const router = express.Router();
const c = require('../controllers/game_contr');


router.get('/',c.getGames);
router.post('/',c.postGames);
router.patch('/:id',c.patchGames);
router.delete('/:id',c.deleteGames);


module.exports = router;