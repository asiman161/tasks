<?php
/**
 * Created by PhpStorm.
 * User: Asiman
 * Date: 12.02.2016
 * Time: 3:41
 */

include "bd.php";

if(isset($_POST)){
    if(isset($_POST['registration'])){
        $lName = $_POST['lname'];
        $fName = $_POST['fname'];
        $fatherName = $_POST['fathername'];
        $login = $_POST['login'];
        $password = $_POST['password'];
        //TODO: сделать нормальную регистрацию, по группам
        $query = "INSERT INTO students (l_name, f_name, father_name, user_login, user_password, group_id) VALUES ('$lName', '$fName', '$fatherName', '$login', '$password', '1')";
        $mysqli->query($query);
        echo "true";
    }
}