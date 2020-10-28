const RobotCommand = require('../models/robotcommand.model');

// store new command
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const commands = req.params.commands;
    let turnsOnCommands = '';

    switch (commands.toLowerCase()) {
        case 'right':
            turnsOnCommands = 'Right';
            break;
        case 'left':
            turnsOnCommands = 'Left';
            break;
        case 'backward':
            turnsOnCommands = 'Back';
            break;
        default:
            turnsOnCommands = 'Forward';
            break;
    }

    // Robot command
    const robot_command = new RobotCommand({
        turn: turnsOnCommands,
        step: req.body.step,
        command_date_time: new Date()
    });

    // Stor in DB
    RobotCommand.create(robot_command, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "some error while storing record."
            });
        } else {
            res.status(201).send(data);
        }
    });

};

exports.currentPosition = (req, res) => {
    RobotCommand.currentPosition((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving current position."
            });
        else res.send(data);
    });
};

