<?php
/**
 * Created by PhpStorm.
 * User: Asiman
 * Date: 10.02.2016
 * Time: 22:28
 */

include "bd.php";

if (isset($_POST)) {
    /*if (isset($_POST['startanswertask'])) {
        $option = $_POST['option'];
        $taskId = $_POST['taskid'];
        $studentLogin = $_SESSION['studentLogin'];
        $query = "SELECT student_id FROM tasks_completed WHERE student_id = (SELECT student_id FROM students WHERE user_login = '$studentLogin') AND task_id = '$taskId'";
        //$query = "SELECT student_id FROM tasks_completed WHERE student_id = (2) AND task_id = '$taskId'";
        $result = $mysqli->query($query)->fetch_row();
        if ($result[0] == "") {
            $time = time();
            $query = "INSERT INTO tasks_completed(task_id, student_id, start_time) VALUES ('$taskId', (SELECT student_id FROM students WHERE user_login = '$studentLogin'), '$time')";
            $mysqli->query($query);
            $query = "SELECT DISTINCT question_option FROM questions WHERE question_option = '$option' AND task_id = '$taskId'";
            $result = $mysqli->query($query)->fetch_row();
            if($option == $result[0]){
                echo "true";
            } else {
                echo "wrong option";
            }
        } else {
            echo "false";
        }
    }*/
    ///////////
    if (isset($_POST['startanswertask'])) {
        $option = $_POST['option'];
        $taskId = $_POST['taskid'];
        //$studentLogin = $_SESSION['studentLogin']; //TODO: удалить после проверка корректности вывода
        $studentId = $_SESSION['studentId'];
        $query = "SELECT DISTINCT question_option FROM questions WHERE question_option = '$option' AND task_id = '$taskId'";
        $result = $mysqli->query($query)->fetch_row();
        if($option == $result[0]){
            $query = "SELECT student_id FROM tasks_completed WHERE student_id = '$studentId' AND task_id = '$taskId'";
            //$query = "SELECT student_id FROM tasks_completed WHERE student_id = (SELECT student_id FROM students WHERE user_login = '$studentLogin') AND task_id = '$taskId'";
            //$query = "SELECT student_id FROM tasks_completed WHERE student_id = (2) AND task_id = '$taskId'";
            $result = $mysqli->query($query)->fetch_row();
            if($result[0] == ""){
                $time = time();
                $query = "INSERT INTO tasks_completed(task_id, student_id, start_time) VALUES ('$taskId', '$studentId', '$time')";
                //$query = "INSERT INTO tasks_completed(task_id, student_id, start_time) VALUES ('$taskId', (SELECT student_id FROM students WHERE user_login = '$studentLogin'), '$time')";
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
        //$studentLogin = $_SESSION['studentLogin']; //TODO: удалить после проверка корректности вывода
        $studentId = $_SESSION['studentId'];
        $query = "SELECT task_time FROM tasks_completed WHERE student_id = '$studentId' AND task_id = '$taskId'";
        //$query = "SELECT task_time FROM tasks_completed WHERE student_id = (SELECT student_id FROM students WHERE user_login = '$studentLogin') AND task_id = '$taskId'";
        $result = $mysqli->query($query)->fetch_row();
        if ($result[0] == "") {
            $answers = $_POST['answers'];
            $answers = explode("|", $_POST['answers']);
            $questionId = $_POST['questionid'];
            $option = $_POST['option'];
            $time = time();

            $query = "SELECT start_time FROM tasks_completed WHERE task_id = '$taskId' and student_id = '$studentId'";
            //$query = "SELECT start_time FROM tasks_completed WHERE task_id = '$taskId' and student_id = (SELECT student_id FROM students WHERE user_login = '$studentLogin')";
            $oldTime = $mysqli->query($query)->fetch_row();
            $time -= $oldTime[0];
            $query = "UPDATE tasks_completed SET task_time = '$time' WHERE task_id = '$taskId' AND student_id = '$studentId'";
            //$query = "UPDATE tasks_completed SET task_time = '$time' WHERE task_id = '$taskId' AND student_id = (SELECT student_id FROM students WHERE user_login = '$studentLogin')";
            $mysqli->query($query);
            for ($i = 0; $i < count($questionId); $i++) {
                $question = $questionId[$i];
                $answer = $answers[$i];
                $query = "INSERT INTO control_answers(question_id, task_id, task_option, student_id, answer_text) VALUES ('$question','$taskId' ,'$option' , '$studentId','$answer')";
                //$query = "INSERT INTO control_answers(question_id, task_id, task_option, student_id, answer_text) VALUES ('$question','$taskId' ,'$option' , (SELECT student_id FROM students WHERE user_login = '$studentLogin'),'$answer')";
                $mysqli->query($query);
            }
            $query = "INSERT INTO students_tasks(student_id, task_id, create_date) VALUES ('$studentId', '$taskId', curdate())";
            //$query = "INSERT INTO students_tasks(student_id, task_id, create_date) VALUES ((SELECT student_id FROM students WHERE user_login = '$studentLogin'), '$taskId', curdate())";
            $mysqli->query($query);

            $query = "SELECT groups_tasks_id FROM groups_tasks WHERE group_id = (SELECT group_id FROM students WHERE student_id = '$studentId') AND task_id = '$taskId'";
            //$query = "SELECT groups_tasks_id FROM groups_tasks WHERE group_id = (SELECT group_id FROM students WHERE user_login = '$studentLogin') AND task_id = '$taskId'";
            $result = $mysqli->query($query)->fetch_row();
            if ($result[0] == "") {
                $query = "INSERT INTO groups_tasks(group_id, task_id) VALUES ((SELECT group_id FROM students WHERE student_id = '$studentId'), '$taskId')";
                //$query = "INSERT INTO groups_tasks(group_id, task_id) VALUES ((SELECT group_id FROM students WHERE user_login = '$studentLogin'), '$taskId')";
                $mysqli->query($query);
            }
        }
    }
}