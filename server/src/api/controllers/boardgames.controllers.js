const boardgames = require('../models/boardgames.models');

const getAllBoardgames = async(req, res) => {
    try {
        const allBoardgames = await boardgames.find();
        return res.status(200).json(allBoardgames); 
    } catch (error) {
        return res.status(500).json(error)
    }
    };

const getBoardgame = async(req, res) => {
    try {
        const {id} = req.params;
        const allBoardgames = await boardgames.findById(id);
        return res.status(200).json(allBoardgames); 
    } catch (error) {
        return res.status(500).json(error)
    }
};
    

const postNewBoardgame = async(req, res) => {
    try {
     const {name, genre, year, picture} = req.body;
     const newBoardgame = new boardgames({name, genre, year, picture});
     const createdBoardgame = await newBoardgame.save();
     return res.status(201).json(createdBoardgame);
    } catch (error) {
       return res.status(500).json(error)
    }
};

const putBoardgame = async(req, res) => {
    try {
       const {id} = req.params;
       const putBoardgame = new boardgames(req.body)
       putBoardgame._id = id;

       const boardgameDB = await boardgames.findByIdAndUpdate(id, putBoardgame);
        if(!boardgameDB){
            return res.status(404).json({"message": "Boardgame not found!"});
        }    
        return res.status(200).json(putBoardgame);
    }   catch (error) {
        return res.status(500).json(error)
    }
};

const deleteBoardgame = async(req, res) => {
    try {
        const {id} = req.params;
        const boardgameDB = await boardgames.findByIdAndDelete(id);
        if(!boardgameDB){
            return res.status(404).json({"message": "Boardgame not found!"});
        }
        return res.status(200).json(boardgameDB);
    } catch (error) {
        return res.status(500).json(error)
    }
    }

module.exports = {getAllBoardgames, getBoardgame, postNewBoardgame, putBoardgame, deleteBoardgame};