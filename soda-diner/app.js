const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const routes = require('./routes/routes')
const bodyParser = require('body-parser')
const app = express()
const databaseString = 'mongodb://localhost/soda-diner';

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== 'test') {
    mongoose.connect(databaseString, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
};
mongoose.connection.on('open', () => {
    console.log(`Mongoose connected to ${databaseString}`)
})
mongoose.connection.on('error', (err) => {
    console.log(`Mongoose connection error: ${err}`)
})

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'client/')));
routes(app);

app.use((err, req, res, next) => {
    console.log('error:' + err)
})

module.exports = app;