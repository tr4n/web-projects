const express = require('express');
const apiRouter = express.Router(); 

apiRouter.get('/', async(request, response) => {
    try {
        console.log(__dirname + '/public/index.html');
        response.sendFile(__dirname + '/public/index.html');
    } catch (error) {
        console.log(error);
    }
})

module.exports = apiRouter; 