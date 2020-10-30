const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');

app.use(bodyParser.json());

require("./robotcontrollerapi/routes/robotcommand.routes")(app);

//ROUTES
app.get('/', (req, res) => {
    res.send('We are @home');
});

const port = process.env.PORT || 5000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// set port, listen for requests
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});