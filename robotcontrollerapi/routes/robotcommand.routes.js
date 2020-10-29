module.exports = app => {
    const commands = require("../controllers/robotcommand.controller.js");

    // Create a new command
    app.post("/api/v1/robot-command", commands.create);

    // Retrieve current position
    app.get("/api/v1/robot-current-position", commands.currentPosition);
};