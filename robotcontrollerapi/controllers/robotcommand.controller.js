// @ts-check

/**
 * Controller to maintain APIs
 */

const RobotCommandService = require('../services/robotcommand.service');
const Validator = require("fastest-validator");

/**
 * Store new command
 * @param {object} req - http request
 * @param {object} res - http resposne
 * @returns json resposne
 */
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Content could not be empty!"
        });
    }

    const commandTurn = req.body.turn;
    const commandStep = req.body.step;

    // @ts-ignore
    const requestValidator = new Validator();

    const validatorSchema = {
        turn: { type: "string", min: 4, max: 8 },
        step: { type: "number", integer: true }
    };

    const validatorResponse = requestValidator.validate(
        { turn: commandTurn, step: commandStep },
        validatorSchema
    );

    if (validatorResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validatorResponse
        });
    }

    const robot_command = {
        turn: commandTurn,
        step: commandStep,
        command_date_time: new Date()
    };

    // Store in DB
    RobotCommandService.storePosition(robot_command, (err, data) => {
        if (err) {
            return res.status(500).json({
                message:
                    err.message || "some error while storing record."
            });
        } else {
            return res.status(201).json(data);
        }
    });

};

/**
 * Get current position
 * @param {object} req - http request
 * @param {object} res - http resposne
 * @returns json resposne
 */
exports.currentPosition = (req, res) => {
    RobotCommandService.currentPosition((err, data) => {
        if (err) {
            return res.status(500).json({
                message:
                    err.message || "Some error occurred while retrieving current position."
            });
        } else {
            return res.status(200).json(data);
        }
    });
};

