<?php
/**
 * Created by PhpStorm.
 * User: Asiman
 * Date: 31.01.2016
 * Time: 19:23
 */
session_set_cookie_params(0);
session_start();
$mysqli = new mysqli("localhost", "u608271277_root", "bestpass", "u608271277_tests");
if ($mysqli->connect_errno) {
    printf("Не удалось подключиться: %s\n", $mysqli->connect_error);
    exit();
}

if (isset($_POST['start'])) {
    $query = "SELECT user_login FROM teachers WHERE user_login='" . $_SESSION['teacherLogin'] . "'";
    $login = $mysqli->query($query)->fetch_row();
    if ($login[0] == $_SESSION['teacherLogin'] && $login[0] != "") {
        echo "true";
    } else {
        echo "false";
    }
}




