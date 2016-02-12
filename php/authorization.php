<?php
/**
 * Created by PhpStorm.
 * User: Asiman
 * Date: 30.01.2016
 * Time: 22:57
 */

include "bd.php";

if (isset($_POST['login']) && isset($_POST['password'])) {
    if($_POST['user'] == "teacher") {
        $login = $_POST['login'];
        $password = $_POST['password'];
        $query = "SELECT user_login FROM teachers WHERE user_login='$login' AND user_password='$password'";
        $login = $mysqli->query($query)->fetch_row();
        if ($login[0] == $_POST['login']) {
            $query = "SELECT prefix FROM teachers WHERE user_login='$login[0]'";
            $prefix = $mysqli->query($query)->fetch_row();
            $_SESSION['teacherPrefix'] = $prefix[0];
            $_SESSION['teacherLogin'] = $login[0];
            echo "true";
        } else {
            echo "такого пользователя нет";
            echo "--".$login[0]." ".$_POST['login']."--";
        }
    } else {
        $login = $_POST['login'];
        $password = $_POST['password'];
        $query = "SELECT user_login FROM students WHERE user_login='$login' AND user_password='$password'";
        $login = $mysqli->query($query)->fetch_row();
        if($login[0] == $_POST['login']){
            $query = "SELECT group_id FROM students WHERE user_login='$login[0]'";
            $studentGroup = $mysqli->query($query)->fetch_row();
            $_SESSION['studentLogin'] = $login[0];
            $_SESSION['studentGroup'] = $studentGroup[0];
            echo "true";
        } else {
            echo "Такого пользователя нет";
        }
    }
} else {
    echo "нет поста";
}


/*while (($row = $result->fetch_assoc()) != false) {
    print_r($row['l_name']);
}*/