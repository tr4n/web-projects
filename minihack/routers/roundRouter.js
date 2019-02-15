const express = require('express');
const RoundRouter = express();
const RoundModel = require('../models/roundModel');
const path = require('path');


RoundRouter.post('/add', async (request, response) => {
    const {
        gameId,
        roundId,
        first,
        second,
        third,
        fourth
    } = request.body;
    await RoundModel.create({
        gameId,
        roundId,
        first,
        second,
        third,
        fourth
    }, (error) => {
        if (error) {
            console.log(error);
            response.status(404).json({
                success: 0,
                error
            });
        } else {
            console.log("create game model success");
            response.status(200).json({
                success: 1,
                message: "Create model success"
            })
        }

    })

});

RoundRouter.get('/getById', async (request, response) => {
    const {
        gameId,
        roundId
    } = request.query;
    console.log(gameId + " " + roundId);
    await RoundModel.findOne({
            gameId,
            roundId
        },
        (error, round) => {
            if (error) {
                console.log(error);
                response.status(404).json({
                    success: 0,
                    error
                });
            } else {
                console.log(round);
                response.status(200).json({
                    success: 1,
                    round
                })
            }

        })

});


RoundRouter.put('/update', async (request, response) => {
    const {
        gameId,
        roundId,
        first,
        second,
        third,
        fourth
    } = request.body;
    console.log("request", request.body);
    await RoundModel.findOneAndUpdate({
            gameId: gameId,
            roundId: roundId
        }, {
            gameId,
            roundId,
            first,
            second,
            third,
            fourth
        },
        (error, round) => {
            if (error) {
                console.log(error);
                response.status(404).json({
                    success: 0,
                    error
                });
            } else {           
                response.status(200).json({
                    success: 1,
                    round
                })
            }

        })

});

RoundRouter.get('/:gameId', async (request, response) => {
    await RoundModel.find({
        gameId: request.params.gameId
    }).exec(function (error, results) {
        if (error) {
            console.log(error);
            response.status(404).json({
                success: 0,
                error
            })
        } else {
            response.status(200).json({
                success: 1,
                rounds: results
            })
        }

    });
})

RoundRouter.get('/roundId/:gameId', async (request, response) => {

    await RoundModel.find({
        gameId: request.params.gameId
    }).exec(function (error, results) {
        if (error) {
            console.log(error);
            response.status(404).json({
                success: 0,
                error
            })
        } else {
            response.status(200).json({
                success: 1,
                roundId: results.length + 1
            })
        }

    });

});

module.exports = RoundRouter;