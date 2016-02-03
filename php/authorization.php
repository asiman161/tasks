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
    $query = "SELECT login FROM teachers WHERE login='".$login."' AND password='".$password."'";
    $login = $mysqli->query($query)->fetch_row();
    if ($login[0] == $_POST['login']) {
        //setcookie("loginTeacher", $login[0], 0,"/");
        $_SESSION["loginTeacher"] = $login[0];
        echo "true";
        //echo $_SESSION["loginTeacher"];

    } else {
        echo "такого пользователя нет";
    }
} else{
    echo "нет поста";
}


/*while (($row = $result->fetch_assoc()) != false) {
    print_r($row['l_name']);
}*/


/*$res1 = $mysqli->query("SELECT COUNT(*) FROM teachers WHERE f_name='Сергей' ")->fetch_assoc();
if($res1['COUNT(*)'] == 1){
    echo 'solo';
} else {
    echo 'many';
}
$res2 = $mysqli->query("SELECT COUNT(*) FROM teachers WHERE f_name='Павел' ")->fetch_assoc();
if($res2['COUNT(*)'] == 1){
    echo 'solo';
} else {
    echo 'many';
}*/


//var_dump($_POST);


//echo $users;

?>