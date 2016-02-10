<?php
/**
 * Created by PhpStorm.
 * User: Asiman
 * Date: 10.02.2016
 * Time: 22:28
 */

include "bd.php";

if(isset($_POST)){
    if(isset($_POST['startanswertask'])){
        $taskId = $_POST['taskid'];
        $studentLogin = $_SESSION['studentLogin'];
        $query = "SELECT student_id FROM tasks_completed WHERE student_id = (SELECT student_id FROM students WHERE user_login = '$studentLogin') AND task_id = '$taskId'";
        //$query = "SELECT student_id FROM tasks_completed WHERE student_id = (2) AND task_id = '$taskId'";
        $result = $mysqli->query($query) ->fetch_row();
        if ($result[0] == ""){
            $time = time();
            $query = "INSERT INTO tasks_completed(task_id, student_id, start_time) VALUES ('$taskId', (SELECT student_id FROM students WHERE user_login = '$studentLogin'), '$time')";
            $mysqli->query($query);
            echo "true";
        } else {
            echo "false";
        }
    } else if(isset($_POST['answers'])){
        $answers = $_POST['answers'];
        $answers = explode("|", $_POST['answers']);
        $questionId = $_POST['questionid'];
        $studentLogin = $_SESSION['studentLogin'];

        for($i = 0; $i < count($questionId); $i++){
            $q = $questionId[$i];
            $a = $answers[$i];
            $query = "INSERT INTO control_answers(question_id, student_id, answer_text) VALUES ('$q', (SELECT student_id FROM students WHERE user_login = '$studentLogin'),'$a')";
            $mysqli->query($query);
        }
    }
}