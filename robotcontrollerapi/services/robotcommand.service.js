// @ts-check

/**
 * Robot Command Service
 * @module Robot Command Service
 */

const sql = require('../config/db');
const robotPosition = require('../models/robotposition.model');

/**
 * Direction Mapper
 * @type {object}
 */
const directionMapping = {
    "+X": { "Left": "+Y", "Right": "-Y", "Backward": "-X", "Forward": "+X" },
    "-X": { "Left": "-Y", "Right": "+Y", "Backward": "+X", "Forward": "-X" },
    "+Y": { "Left": "-X", "Right": "+X", "Backward": "-Y", "Forward": "+Y" },
    "-Y": { "Left": "+X", "Right": "-X", "Backward": "+Y", "Forward": "-Y" }
};

/**
 * Robot Position On Input Command
 * @param {string} previous_direction Previous direction from stored value, default +Y
 * @param {number} position_x Previous x position from stored value, default 0
 * @param {number} position_y Previous y position from stored value, default 0
 * @param {Object} command Executed command
 * @returns {Object} RobotPositionModel
 */
const robotPositionOnInputCommand = (previous_direction, position_x, position_y, command) => {

    let new_position_x, new_position_y;

    const new_direction = directionMapping[previous_direction][command.turn];

    switch (new_direction) {
        case '+X':
            new_position_x = position_x + command.step;
            new_position_y = position_y;
            break;
        case '-X':
            new_position_x = position_x - command.step;
            new_position_y = position_y;
            break;
        case '+Y':
            new_position_y = position_y + command.step;
            new_position_x = position_x;
            break;
        case '-Y':
            new_position_y = position_y - command.step;
            new_position_x = position_x;
            break;
    }

    return new robotPosition.RobotPositionModel({
        command: command.turn,
        direction: new_direction,
        position_x: new_position_x,
        position_y: new_position_y,
        last_position_date: command.command_date_time,
    });

}

/**
 * Store a new command
 * @param {object} newCommand 
 * @param {object} result
 * @returns {object} New commands as JSON 
 */
exports.storePosition = (newCommand, result) => {

    sql.query("SELECT * FROM robot_position ORDER BY id DESC LIMIT 0,1", (err, res) => {

        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        let robot_position = {};

        if (res[0]) {

            robot_position = robotPositionOnInputCommand(
                res[0].direction,
                res[0].position_x,
                res[0].position_y,
                newCommand
            );

        } else {
            // default_direction = +Y, default_position = (0,0)
            robot_position = robotPositionOnInputCommand(
                '+Y',
                0,
                0,
                newCommand
            );

        }

        sql.query("INSERT INTO robot_position SET ?", robot_position, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            result(null, { id: res.insertId, ...robot_position });

        });


    });
};

/**
 * Robot position data
 * @param {object} result 
 * @returns {object} Position data as JSON
 */
exports.currentPosition = result => {
    sql.query("SELECT * FROM robot_position ORDER BY id DESC LIMIT 0,2", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        const currentPositionData = {
            'current-position': res[0].position_x + ',' + res[0].position_y,
            'current-position-date': res[0].last_position_date,
            'last-position': res[1].position_x + ',' + res[1].position_y,
            'last-position-date': res[1].last_position_date
        };

        return result(null, currentPositionData);
    });
};