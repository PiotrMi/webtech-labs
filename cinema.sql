DROP TABLE IF EXISTS `Tickets`;

CREATE TABLE `Tickets` (
      `id` int(11) NOT NULL AUTO_INCREMENT,
      `movie` varchar(255) DEFAULT NULL,
      `session` int(11) DEFAULT NULL,
      `row` int(11) DEFAULT NULL,
      `seat` int(11) DEFAULT NULL,
      PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
