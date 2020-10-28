const sql = require('./db.js');
const CurrentPosition = require('./currentposition.model');

// constructor
const RobotCommand = function (robot_command) {
    this.turn = robot_command.turn;
    this.step = robot_command.step;
    this.command_date_time = robot_command.command_date_time;
}

// Save a new command for robot
RobotCommand.create = (newCommand, result) => {
    sql.query("INSERT INTO commands SET ?", newCommand, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        // console.log(res);

        // console.log("command added: ", { id: res.insertId, ...newCommand });
        result(null, { id: res.insertId, ...newCommand });

        sql.query("SELECT * FROM current_position ORDER BY id DESC LIMIT 0,1", (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            let pos_x, pos_y, pos_turn_x, pos_turn_y;
            let current_position = {};

            if (res[0]) {

                // console.log(res[0]);

                if (newCommand.turn === 'Right' || newCommand.turn === 'Left') {
                    pos_x = newCommand.step;
                    pos_y = res[0].position_y;
                    pos_turn_x = newCommand.turn;
                    pos_turn_y = res[0].position_turn_y;
                } else {
                    pos_x = res[0].position_x;
                    pos_y = newCommand.step;
                    pos_turn_x = res[0].position_turn_x;
                    pos_turn_y = newCommand.turn;
                }

                current_position = new CurrentPosition({
                    position_x: pos_x,
                    position_y: pos_y,
                    position_turn_x: pos_turn_x,
                    position_turn_y: pos_turn_y,
                    current_date_time: newCommand.command_date_time
                });
            } else {

                if (newCommand.turn === 'Right' || newCommand.turn === 'Left') {
                    pos_x = newCommand.step;
                    pos_y = 0;
                    pos_turn_x = newCommand.turn;
                    pos_turn_y = null;
                } else {
                    pos_x = 0;
                    pos_y = newCommand.step;
                    pos_turn_x = null;
                    pos_turn_y = newCommand.turn;
                }

                current_position = new CurrentPosition({
                    position_x: pos_x,
                    position_y: pos_y,
                    position_turn_x: pos_turn_x,
                    position_turn_y: pos_turn_y,
                    current_date_time: newCommand.command_date_time
                });

            }

            sql.query("INSERT INTO current_position SET ?", current_position, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
                // console.log("command added: ", { id: res.insertId, ...current_position });
            });

        });
    });
};


RobotCommand.currentPosition = result => {
    sql.query("SELECT * FROM current_position ORDER BY id DESC LIMIT 0,2", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        const currentPositionData = {
            'current-position': res[0].position_x + ',' + res[0].position_y,
            'previous-position': res[1].position_x + ',' + res[1].position_y,
            'current-date-time': res[0].current_date_time
        };

        result(null, currentPositionData);
    });
};



module.exports = RobotCommand;
