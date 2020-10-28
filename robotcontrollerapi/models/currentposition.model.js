// constructor
const CurrentPosition = function (current_position) {
    this.position_x = current_position.position_x;
    this.position_y = current_position.position_y;
    this.position_turn_x = current_position.position_turn_x;
    this.position_turn_y = current_position.position_turn_y;
    this.current_date_time = current_position.current_date_time;
}

module.exports = CurrentPosition;
