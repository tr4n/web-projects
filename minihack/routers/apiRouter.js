const express = require('express');
const ApiRouter = express.Router();
const GameModel = require('../models/gameModel');
const RoundModel = require('../models/roundModel');

//CRUD

ApiRouter.post('/game', async (request, response) => {
    const {
        gameId,
        first,
        second,
        third,
        fourth
    } = request.body;
    await GameModel.create({
        gameId,
        first,
        second,
        third,
        fourth
    }, (error) => {
        if(error){
            console.log(error);
            response.status(404).json({
                success:0,
                error
            });
        }else{
            console.log("create game model success");
            response.status(200).json({
                success:1,
                message: "Create model success"
            })
        }
        
    })

});

ApiRouter.get('/gameId', async (request, response) => {

    await GameModel.find().exec(function (error, results) {
        if (error) {
            console.log(error);
            response.status(404).json({
                success: 0,
                error
            })
        } else {
            response.status(200).json({
                success: 1,
                gameId: results.length + 1
            })
        }

    });

});


module.exports = ApiRouter;