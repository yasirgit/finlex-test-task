// @ts-check

module.exports = app => {
    const commands = require("../controllers/robotcommand.controller.js");

    /**
     * API to store a new command
     */
    app.post("/api/v1/robot-command", commands.create);

    /**
     * Retrieve current position info
     */
    app.get("/api/v1/robot-current-position", commands.currentPosition);
};