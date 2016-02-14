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
            $query = "SELECT prefix, teacher_id FROM teachers WHERE user_login='$login[0]'";
            $result = $mysqli->query($query)->fetch_row();
            /*$query = "SELECT teacher_id FROM teachers WHERE user_login='$login[0]'";
            $teacherId = $mysqli->query($query)->fetch_row();*/
            $_SESSION['teacherPrefix'] = $result[0];
            $_SESSION['teacherId'] = $result[1];
            $_SESSION['teacherLogin'] = $login[0];
            echo "true";
        } else {
            echo "такого пользователя нет";
        }
    } else {
        $login = $_POST['login'];
        $password = $_POST['password'];
        $query = "SELECT user_login FROM students WHERE user_login='$login' AND user_password='$password'";
        $login = $mysqli->query($query)->fetch_row();
        if($login[0] == $_POST['login']){
            $query = "SELECT group_id,student_id FROM students WHERE user_login='$login[0]'";
            $result = $mysqli->query($query)->fetch_row();
            /*$query = "SELECT student_id FROM students WHERE user_login = '$login[0]'";
            $studentId = $mysqli->query($query)->fetch_row();*/
            $_SESSION['studentLogin'] = $login[0];
            $_SESSION['studentGroup'] = $result[0];
            $_SESSION['studentId'] = $result[1];
            echo "true";
        } else {
            echo "Такого пользователя нет";
        }
    }
} else {
    echo "нет поста"."\n".$_POST['login']."---";
}