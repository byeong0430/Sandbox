<?php 
    $servername = "localhost";
    $username = "admin_user";
    $password = "Pe2chMonkeyD2nce!";
    $dbname = "byeong_dev";

    // Create connection
    $conn = mysqli_connect($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    } 
    
    $accountID = $_POST["accountID"];
    $places = $_POST["placeID"];

    foreach ($places as $value)
    {
        $arr = [$accountID, '"'.$value.'"'];
        $arr_imp = implode(",", $arr);
        $multi_arr[] = "(".$arr_imp.")";
    }

    $multi_values = implode(",", $multi_arr);

    $sql = "INSERT IGNORE INTO location (account_id, place_id) VALUES ".$multi_values;

    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
    
    $conn->close();
?>