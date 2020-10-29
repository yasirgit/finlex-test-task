const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

require("./robotcontrollerapi/routes/robotcommand.routes")(app);

//ROUTES
app.get('/', (req, res) => {
    res.send('We are @home');
});

// set port, listen for requests
// app.listen(5000, () => {
//     console.log("Server is running on port 5000.");
// });

app.listen(process.env.PORT || 5000);