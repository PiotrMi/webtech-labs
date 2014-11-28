<?php

    error_reporting(E_ALL);

    include("../config.php");

    $action = $_GET["action"];
    $session = $_GET["session"];

    if($action == "get") {
        $query = "SELECT * FROM Tickets";
    } else if ($action == "create") {
        $query = "INSERT INTO Tickets (`movie`, `session`, `row`, `seat`) VALUES ('Olol', 12, 4, 15);";
    } else {
        $query = "SELECT * FROM Tickets";
    }

    echo $query;

    $data = mysql_query($query);

    $result = array();

    while($row = mysql_fetch_array($data)) {
        array_push($result, $row);
    }

    echo json_encode($result);

?>
