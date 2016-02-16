<?php
/**
 * Created by PhpStorm.
 * User: Asiman
 * Date: 10.02.2016
 * Time: 22:28
 */

include "bd.php";

if (isset($_POST)) {

    if (isset($_POST['startanswertask'])) {
        $option = $_POST['option'];
        $taskId = $_POST['taskid'];
        $studentId = $_SESSION['studentId'];
        $query = "SELECT DISTINCT question_option FROM questions WHERE question_option = '$option' AND task_id = '$taskId'";
        $result = $mysqli->query($query)->fetch_row();
        if($option == $result[0]){
            $query = "SELECT student_id FROM tasks_completed WHERE student_id = '$studentId' AND task_id = '$taskId'";
            $result = $mysqli->query($query)->fetch_row();
            if($result[0] == ""){
                $time = time();
                $query = "INSERT INTO tasks_completed(task_id, student_id, start_time) VALUES ('$taskId', '$studentId', '$time')";
                $mysqli->query($query);
                echo "true";
            } else {
                echo "false";
            }
        } else {
            echo "wrong option";
        }
    }
    ///////////////
    else if (isset($_POST['answers'])) {
        $taskId = $_POST['taskid'];
        $studentId = $_SESSION['studentId'];
        $query = "SELECT task_time FROM tasks_completed WHERE student_id = '$studentId' AND task_id = '$taskId'";
        $result = $mysqli->query($query)->fetch_row();
        if ($result[0] == "") {
            $answers = $_POST['answers'];
            $answers = explode("|", $_POST['answers']);
            $questionId = $_POST['questionid'];
            $option = $_POST['option'];
            $time = time();

            $query = "SELECT start_time FROM tasks_completed WHERE task_id = '$taskId' and student_id = '$studentId'";
            $oldTime = $mysqli->query($query)->fetch_row();
            $time -= $oldTime[0];
            $query = "UPDATE tasks_completed SET task_time = '$time' WHERE task_id = '$taskId' AND student_id = '$studentId'";
            $mysqli->query($query);
            for ($i = 0; $i < count($questionId); $i++) {
                $question = $questionId[$i];
                $answer = $answers[$i];
                $query = "INSERT INTO control_answers(question_id, task_id, task_option, student_id, answer_text) VALUES ('$question','$taskId' ,'$option' , '$studentId','$answer')";
                $mysqli->query($query);
            }
            $query = "INSERT INTO students_tasks(student_id, task_id, create_date) VALUES ('$studentId', '$taskId', curdate())";
            $mysqli->query($query);

            $query = "SELECT groups_tasks_id FROM groups_tasks WHERE group_id = (SELECT group_id FROM students WHERE student_id = '$studentId') AND task_id = '$taskId'";
            $result = $mysqli->query($query)->fetch_row();
            if ($result[0] == "") {
                $query = "INSERT INTO groups_tasks(group_id, task_id) VALUES ((SELECT group_id FROM students WHERE student_id = '$studentId'), '$taskId')";
                $mysqli->query($query);
            }
        }
    }
}