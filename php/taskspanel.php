<?php
/**
 * Created by PhpStorm.
 * User: Asiman
 * Date: 09.02.2016
 * Time: 22:52
 */

include "bd.php";

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

if(isset($_POST['allTasksByTeacher'])){
    $login = $_SESSION['studentLogin'];
    $teacherName = $_POST['teacherName'];
    $query = "SELECT EXISTS(SELECT groups_and_teachers_id FROM groups_and_teachers WHERE group_id = (SELECT group_id FROM students WHERE user_login = '$login') AND teacher_id = (SELECT teacher_id FROM teachers WHERE l_name = '$teacherName'))";
    $result = $mysqli->query($query)->fetch_row();
    if($result[0] == 1){
        $query = "SELECT task_name, task_type, create_date FROM tasks WHERE teacher_id = (SELECT teacher_id FROM teachers WHERE l_name = '$teacherName')";
        posts($mysqli, $query);
    }
}