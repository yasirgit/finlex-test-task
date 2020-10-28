module.exports = app => {
    const commands = require("../controllers/robotcommand.controller.js");

    // console.log('CONTREEE');
    // Create a new command
    app.post("/api/v1/robot-command/:commands", commands.create);

    app.get("/api/v1/robot-current-position", commands.currentPosition);

    // Retrieve all commands
    // app.get("/robot-command", commands.findAll);

    // Retrieve a single command by commandId
    // app.get("/robot-command/:commandId", commands.findOne);
};