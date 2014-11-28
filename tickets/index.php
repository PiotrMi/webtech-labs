<?php

    error_reporting(E_ALL);

    include("../config.php");

    $action = $_GET["action"];
    $session = $_GET["session"];

    $query = "SELECT * FROM Tickets";

    if($action == "create") {
        $values = join(",", array(
            "'". $_POST["movie"] ."'",
            $_POST["session"],
            $_POST["row"],
            $_POST["seat"]));
        $query = "INSERT INTO Tickets (`movie`, `session`, `row`, `seat`) VALUES (". $values .");";
    }

    $data = mysql_query($query);

    $result = array();

    while($row = mysql_fetch_array($data)) {
        array_push($result, $row);
    }

    echo json_encode($result);

?>
