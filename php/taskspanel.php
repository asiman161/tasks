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
        $query = "SELECT question_text, question_id FROM questions WHERE question_option = '$option' AND task_id = '$taskId' ORDER BY question_id ASC";
        posts($mysqli, $query);
    } else if (isset($_POST['getcompletedtasks'])) {
        $studentLogin = $_SESSION['studentLogin'];
        $query = "SELECT students_tasks.task_id, task_name, students_tasks.create_date, task_time,rating FROM students_tasks, tasks WHERE student_id = (SELECT student_id FROM students WHERE user_login = '$studentLogin') && students_tasks.task_id = tasks.task_id";
        posts($mysqli, $query);
    } else if (isset($_POST['showstudentanswers'])) {
        $studentLogin = $_SESSION['studentLogin'];
        $taskId = $_POST['taskid'];
        $query = "SELECT question_text, answer_text, answer_teacher_text FROM questions,control_answers WHERE student_id = (SELECT student_id FROM students WHERE user_login = '$studentLogin') AND control_answers.question_id = questions.question_id AND control_answers.task_id = '$taskId'";
        posts($mysqli, $query);
    } else if (isset($_POST['allTasksByTeacher'])) {
        $teacherId = $_POST['teacherId'];
        $query = "SELECT task_id,task_name, task_type,task_time, create_date FROM tasks WHERE teacher_id = '$teacherId' ORDER BY task_id ASC";
        posts($mysqli, $query);
    }
}