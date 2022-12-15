const express = require('express');
const router = express.Router();
const c = require('../controllers/game_contr');


router.get('/',c.getGames);
router.post('/',c.postGame);
router.patch('/:id',c.patchGameById);
router.delete('/:id',c.deleteGameById);



module.exports = router;