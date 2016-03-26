<?php
/**
 * Created by PhpStorm.
 * User: Asiman
 * Date: 26.03.2016
 * Time: 17:15
 */

include 'bd.php';

function posts($mysqli, $query)
{
    /** @noinspection PhpUndefinedMethodInspection */
    $result = $mysqli->query($query);
    $array_tasks = array();
    while ($data = mysqli_fetch_assoc($result)) {
        $array_tasks[] = $data;
    }
    echo json_encode($array_tasks);
}

if (isset($_POST)) {
    if ($_SESSION['adminLogin'] == 'kolesnikov' && $_SESSION['adminPassword'] == '$777&qaz') {
        if (isset($_POST['getTeachers'])) {
            $query = "SELECT l_name, f_name, father_name, teacher_id FROM teachers";
            posts($mysqli, $query);
        } else if (isset($_POST['getGroups'])) {
            $query = "SELECT group_name FROM groups";
            posts($mysqli, $query);
        } else if (isset($_POST['showgroups'])) {
            $fname = $_POST['fname'];
            $lname = $_POST['lname'];
            $fathername = $_POST['fathername'];

            $fname = $mysqli->real_escape_string($fname);
            $lname = $mysqli->real_escape_string($lname);
            $fathername = $mysqli->real_escape_string($fathername);

            $query = "SELECT group_id from groups_and_teachers WHERE teacher_id = (SELECT teacher_id FROM teachers WHERE f_name = '$fname' and l_name='$lname' AND teachers.father_name='$fathername')";
            //$query = "SELECT group_id from groups_and_teachers WHERE teacher_id = (SELECT teacher_id FROM teachers WHERE f_name = 'Сергей' and l_name='Коновалов' AND teachers.father_name='Евгеньевич')";
            $result = $mysqli->query($query);
            $array_groups = array();
            $query = "";
            while ($data = mysqli_fetch_assoc($result)) {
                $query .= "SELECT group_name FROM groups WHERE group_id = '" . $data['group_id'] . "' UNION ";
            }
            if (strlen($query) > 0) {
                $query = substr($query, 0, strlen($query) - 6);
                posts($mysqli, $query);
            }
        } else if (isset($_POST['createteacher'])) {
            $fname = $mysqli->real_escape_string($_POST['fname']);
            $lname = $mysqli->real_escape_string($_POST['lname']);
            $fathername = $mysqli->real_escape_string($_POST['fathername']);
            $prefix = $mysqli->real_escape_string($_POST['prefix']);
            $login = $mysqli->real_escape_string($_POST['login']);
            $password = $mysqli->real_escape_string($_POST['password']);
            if ($mysqli->query("INSERT INTO teachers(l_name, f_name, father_name, prefix, user_login, user_password) VALUES ('$lname', '$fname', '$fathername', '$prefix' ,'$login', '$password')")) {
                echo "Преподаватель создан";
            } else {
                echo "Произошла ошибка при создании преподавателя\nповторите попытку";
            };
        } else if (isset($_POST['creategroup'])) {
            $groupName = $mysqli->real_escape_string($_POST['groupname']);
            if ($mysqli->query("INSERT INTO groups(group_name) VALUE ('$groupName')")) {
                echo "Группа успешно создана";
            } else {
                echo "Произошла ошибка при создании группы";
            }
        } else if (isset($_POST['addGroupToTeacher'])) {
            $fname = $mysqli->real_escape_string($_POST['fname']);
            $lname = $mysqli->real_escape_string($_POST['lname']);
            $fathername = $mysqli->real_escape_string($_POST['fathername']);
            $groupName = $mysqli->real_escape_string($_POST['groupname']);
            $mysqli->query("DELETE FROM groups_and_teachers WHERE group_id = (SELECT group_id FROM groups WHERE group_name = '$groupName') AND teacher_id = (SELECT teacher_id FROM teachers WHERE f_name='$fname' AND l_name='$lname' AND father_name='$fathername')");
            if ($mysqli->query("INSERT INTO groups_and_teachers(group_id, teacher_id) VALUES ((SELECT group_id FROM groups WHERE group_name = '$groupName'), (SELECT teacher_id FROM teachers WHERE f_name='$fname' AND l_name='$lname' AND father_name='$fathername'))")) {
                echo "Группа привязана";
            } else {
                echo "Произошла ошибка при привязке группы, повторите попытку";
            }
        } else if(isset($_POST['removeGroupToTeacher'])){
            $fname = $mysqli->real_escape_string($_POST['fname']);
            $lname = $mysqli->real_escape_string($_POST['lname']);
            $fathername = $mysqli->real_escape_string($_POST['fathername']);
            $groupName = $mysqli->real_escape_string($_POST['groupname']);
            if ($mysqli->query("DELETE FROM groups_and_teachers WHERE group_id = (SELECT group_id FROM groups WHERE group_name = '$groupName') AND teacher_id = (SELECT teacher_id FROM teachers WHERE f_name='$fname' AND l_name='$lname' AND father_name='$fathername')")) {
                echo "Группа отвязана";
            } else {
                echo "Произошла ошибка при отвязке группы, повторите попытку";
            }
        } else if(isset($_POST['removeTeacher'])){
            $fname = $mysqli->real_escape_string($_POST['fname']);
            $lname = $mysqli->real_escape_string($_POST['lname']);
            $fathername = $mysqli->real_escape_string($_POST['fathername']);
            $mysqli->query("DELETE FROM groups_and_teachers WHERE teacher_id = (SELECT teacher_id FROM teachers WHERE f_name='$fname' AND l_name='$lname' AND father_name='$fathername')");
            if ($mysqli->query("DELETE FROM teachers WHERE f_name='$fname' AND l_name='$lname' AND father_name='$fathername'")) {
                echo "Преподаватель удален";
            } else {
                echo "Произошла ошибка при удалении преподавателя, повторите попытку";
            }
        } else if(isset($_POST['removeGroup'])){
            $groupName = $mysqli->real_escape_string($_POST['groupname']);
            $mysqli->query("DELETE FROM groups_and_teachers WHERE group_id = (SELECT group_id FROM groups WHERE  group_name = '$groupName')");
            if ($mysqli->query("DELETE FROM groups WHERE  group_name = '$groupName'")) {
                echo "Группа удалена";
            } else {
                echo "Произошла ошибка при удалении группы, повторите попытку";
            }
        }
    }
    if (isset($_POST['authAdmin'])) {
        $login = $_POST['login'];
        $password = $_POST['password'];

        if ($login == 'kolesnikov' && $password == '$777&qaz') {
            $_SESSION['adminLogin'] = $login;
            $_SESSION['adminPassword'] = $password;
            echo "true";
        } else {
            echo "Такого пользователя нет";
        }
    }
} else {
    echo 'clear';
}