// @ts-check
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');


const port = process.env.PORT || 3000;

app.set('port', port);
app.use(express.static(__dirname + '/docs'));
app.set('views', __dirname + '/docs');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

require("./robotcontrollerapi/routes/robotcommand.routes")(app);

//ROUTES
app.get('/', (req, res) => {
    res.send('We are @home');
});

app.get('/docs', function (req, res) {
    res.render('index.html');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// set port, listen for requests
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});