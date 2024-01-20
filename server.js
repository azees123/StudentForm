require('dotenv').config();
require('./models/employee.model');
const mongoose = require('mongoose');


const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');

const employeeController = require('./controllers/employeeController');

var App = express();

App.use(bodyparser.urlencoded({
    extended: true
}));
App.use(bodyparser.json());

App.set('views', path.join(__dirname, '/views/'));
App.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
App.set('view engine', 'hbs');

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded');
    } else {
        console.log('Error in DB connection : ' + err);
    }
});

const port = process.env.PORT || 3000;
App.listen(port, () => {
    console.log(`Express server started at port: ${port}`);
});

App.use('/employee', employeeController);