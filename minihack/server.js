const express = require('express'); 
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const apiRouter = require('./routers/apiRouter');
const gameRouter = require('./routers/gameRouter');
const path = require('path');
mongoose.connect('mongodb://localhost/minihack01', (error) => {
    console.log(error || "Connect DB success!");
});

const app  = express(); 
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use('/',express.static('public')); 
app.use('/api', apiRouter);

app.use('/games', gameRouter);


app.listen(8080, (error) => {
    console.log(error|| "server success, port: 8080"); 
})