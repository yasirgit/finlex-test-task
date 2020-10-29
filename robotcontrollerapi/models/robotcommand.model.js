// constructor
const RobotCommandModel = function (robot_command) {
    this.turn = robot_command.turn;
    this.step = robot_command.step;
    this.command_date_time = robot_command.command_date_time;
}

module.exports = RobotCommandModel;
