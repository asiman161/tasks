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
        $groupName = $_POST['groupname'];
        $login = $_POST['login'];
        $password = $_POST['password'];

        $lName = $mysqli->real_escape_string($lName);
        $fName = $mysqli->real_escape_string($fName);
        $fatherName = $mysqli->real_escape_string($fatherName);
        $groupName = $mysqli->real_escape_string($groupName);
        $login = $mysqli->real_escape_string($login);
        $password = $mysqli->real_escape_string($password);

        $query = "SELECT group_id FROM groups WHERE group_name = '$groupName'";
        $result = $mysqli->query($query)->fetch_row();
        if($result[0] != "") {
            $groupId = $result[0];
            $query = "INSERT INTO students (l_name, f_name, father_name, user_login, user_password, group_id) VALUES ('$lName', '$fName', '$fatherName', '$login', '$password', '$groupId')";
            $mysqli->query($query);
            echo "true";
        } else {
            echo "такой группы не существует";
        }
    }
}