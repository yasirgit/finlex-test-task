const sql = require('../config/db');
const robotPosition = require('../models/robotposition.model');

const directionMapping = {
    "+X": { "Left": "+Y", "Right": "-Y", "Backward": "-X", "Forward": "+X" },
    "-X": { "Left": "-Y", "Right": "+Y", "Backward": "+X", "Forward": "-X" },
    "+Y": { "Left": "-X", "Right": "+X", "Backward": "-Y", "Forward": "+Y" },
    "-Y": { "Left": "+X", "Right": "-X", "Backward": "+Y", "Forward": "-Y" }
};

// Store robot position
exports.storePosition = (newCommand, result) => {

    sql.query("SELECT * FROM robot_position ORDER BY id DESC LIMIT 0,1", (err, res) => {

        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        let robot_position = {};
        let new_position_x, new_position_y;

        if (res[0]) {

            const new_direction = directionMapping[res[0].direction][newCommand.turn];

            if (new_direction === '+X') {
                new_position_x = res[0].position_x + newCommand.step;
                new_position_y = res[0].position_y;
            } else if (new_direction === '-X') {
                new_position_x = res[0].position_x - newCommand.step;
                new_position_y = res[0].position_y;
            }

            if (new_direction === '+Y') {
                new_position_y = res[0].position_y + newCommand.step;
                new_position_x = res[0].position_x;
            } else if (new_direction === '-Y') {
                new_position_y = res[0].position_y - newCommand.step;
                new_position_x = res[0].position_x;
            }

            robot_position = new robotPosition.RobotPositionModel({
                command: newCommand.turn,
                direction: new_direction,
                position_x: new_position_x,
                position_y: new_position_y,
                last_position_date: newCommand.command_date_time,
            });

        } else {

            const default_direction = '+Y';
            let default_position_x = 0;
            let default_position_y = 0;

            const new_direction = directionMapping[default_direction][newCommand.turn];


            if (new_direction === '+X') {
                new_position_x = default_position_x + newCommand.step;
                new_position_x = default_position_y;
            } else if (new_direction === '-X') {
                new_position_x = default_position_x - newCommand.step;
                new_position_x = default_position_y;
            }

            if (new_direction === '+Y') {
                new_position_y = default_position_y + newCommand.step;
                new_position_x = default_position_x;
            } else if (new_direction === '-Y') {
                new_position_y = default_position_y - newCommand.step;
                new_position_x = default_position_x;
            }

            robot_position = new robotPosition.RobotPositionModel({
                command: newCommand.turn,
                direction: new_direction,
                position_x: new_position_x,
                position_y: new_position_y,
                last_position_date: newCommand.command_date_time,
            });

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

        result(null, currentPositionData);
    });
};