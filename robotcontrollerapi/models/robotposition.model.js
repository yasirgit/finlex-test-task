// @ts-check

/**
 * RobotPositionModel
 * @param {object} robot_position 
 */
exports.RobotPositionModel = function (robot_position) {
    this.command = robot_position.command;
    this.direction = robot_position.direction;
    this.position_x = robot_position.position_x;
    this.position_y = robot_position.position_y;
    this.last_position_date = robot_position.last_position_date;
}
