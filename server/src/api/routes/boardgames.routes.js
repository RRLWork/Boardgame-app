const express = require('express');

const router = express.Router();

const {getAllBoardgames, postNewBoardgame, putBoardgame, deleteBoardgame, getBoardgame} = require("../controllers/boardgames.controllers")

router.get('/', getAllBoardgames);

router.get('/:id', getBoardgame);

router.post('/' , postNewBoardgame);

router.put('/:id', putBoardgame);

router.delete('/:id', deleteBoardgame);

module.exports = router;