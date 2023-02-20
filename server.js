require('./models/db');

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

App.listen(3000, () => {
    console.log('Express server started at port : 3000');
});

App.use('/employee', employeeController);