<?php
/**
 * Created by PhpStorm.
 * User: Asiman
 * Date: 30.01.2016
 * Time: 22:57
 */
session_set_cookie_params(0);
session_start();
$mysqli = new mysqli("localhost", "u608271277_root", "bestpass", "u608271277_tests");
if ($mysqli->connect_errno) {
    printf("Не удалось подключиться: %s\n", $mysqli->connect_error);
    exit();
}
if (isset($_POST['login']) && isset($_POST['password'])) {
    $login = $_POST['login'];
    $password = $_POST['password'];
    $query = "SELECT user_login FROM teachers WHERE user_login='$login' AND user_password='$password'";
    $login = $mysqli->query($query)->fetch_row();
    if ($login[0] == $_POST['login']) {

        $_SESSION["teacherLogin"] = $login[0];
        echo "true";
    } else {
        echo "такого пользователя нет";
    }
} else {
    echo "нет поста";
}


/*while (($row = $result->fetch_assoc()) != false) {
    print_r($row['l_name']);
}*/