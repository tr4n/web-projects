const express = require('express');
const Main = require('./main');
const path = require('path');
const GameRouter = express.Router(); 

GameRouter.get('/:id', (request, response) => {
       response.sendFile(path.join(__dirname, '..', 'public/index.html'));
})

GameRouter.get('/getLevelById/:id', async(request, response) => {
    try {  
        const { id} = request.params;
        const level = (new Main.Level(id)).getLevel();
        //  console.log(level);
          response.status(200).send({
              level
          })

    } catch (error) {
        console.log(error);
    }
})

module.exports = GameRouter; 