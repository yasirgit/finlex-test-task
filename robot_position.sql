CREATE TABLE `robot_position` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `command` varchar(15) DEFAULT NULL,
  `direction` varchar(5) DEFAULT '+Y',
  `position_x` int(11) DEFAULT '0',
  `position_y` int(11) DEFAULT '0',
  `last_position_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;