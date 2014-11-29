<?php

    $db_host = "127.0.0.1";
    $db_user = "root";
    $db_password = "";
    $db_name = "cinema";

    $connection = mysql_connect($db_host,$db_user,$db_password) or die ("Could not connect to database host");
    mysql_select_db($db_name,$connection) or die ("Database not found");

    mysql_query('SET NAMES \'utf8\'') or die(mysql_error());
    mysql_query('SET CHARACTER SET \'utf8\'') or die(mysql_error());
    mysql_query('SET character_set_client=utf8') or die(mysql_error());

?>
