const express = require('express');
const GameRouter = express.Router();
const GameModel = require('../models/gameModel');
const RoundModel = require('../models/roundModel');
const RoundRouter = require('./roundRouter');
const path = require('path');

GameRouter.get('/:id', (request, response) => {  
   response.sendFile(path.join(__dirname, '..','public/games/game.html'));
});

GameRouter.get('/getById/:id', (request, response) => {
    GameModel
        .find({
            gameId: request.params.id
        }).exec()
        .then(results => {
          
            console.log(results);
            response.status(200).json({
                success: 1,
                names: results[0]
            })
        }).catch(error => {
            console.log(error);
            response.status(404).json({
                success: 0,
                error
            })
        })
});

GameRouter.use('/rounds', RoundRouter );




module.exports = GameRouter;