const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./apiRouter');
const gameRouter  = require('./games/routes');


(async () => {
    try {
        const app = express(); 
        app.use('/',express.static('public')); 
        app.use(bodyParser({
            extended: false
        }));
        app.use(bodyParser.json());
        
        app.use('/games', gameRouter);

        await app.listen(process.env.PORT || 3000);
        console.log(`Server is listening on PORT ${process.env.PORT||3000} ...`);
        
    } catch (error) {
        console.log(error);
    }
})(); 
