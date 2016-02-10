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

if (isset($_POST)) {
    if (isset($_POST['getQuestions'])) {
        $taskId = $_POST['getQuestions'];
        $option = $_POST['option'];
        $query = "SELECT question_text FROM questions WHERE question_option = '$option' AND task_id = '$taskId' ORDER BY question_id ASC";
        posts($mysqli, $query);
    } else if (isset($_POST['allTasksByTeacher'])) {
        $teacherId = $_POST['teacherId'];
        $query = "SELECT task_id,task_name, task_type,task_time, create_date FROM tasks WHERE teacher_id = '$teacherId' ORDER BY task_id ASC";
        posts($mysqli, $query);
    }
}