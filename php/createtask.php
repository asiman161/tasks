<?php
/**
 * Created by PhpStorm.
 * User: Asiman
 * Date: 05.02.2016
 * Time: 21:16
 */
include "bd.php";

if (isset($_POST['questions'])) {
    $query = "SELECT user_login FROM teachers WHERE user_login='" . $_SESSION['teacherLogin'] . "'";
    $login = $mysqli->query($query)->fetch_row();
    if ($login[0] == $_SESSION['teacherLogin'] && $login[0] != "") {
        $questions = $_POST['questions'];
        $options = $_POST['taskoptionsmas'];
        $teacherId = $_SESSION['teacherId'];
        $tasktype = $_POST['tasktype'];
        $tasktime = $_POST['tasktime'];
        $taskname = $_SESSION['teacherPrefix'] . $_POST['taskname'];

        $teacherId = $mysqli->real_escape_string($teacherId);
        $tasktype = $mysqli->real_escape_string($tasktype);
        $tasktime = $mysqli->real_escape_string($tasktime);
        $taskname = $mysqli->real_escape_string($taskname);

        $date = date('Y-m-d');
        $query = "INSERT INTO tasks(teacher_id, task_type, task_time, task_name, create_date) VALUES ('$teacherId', '$tasktype', '$tasktime', '$taskname', '$date')";
        $res = $mysqli->query($query);
        if ($res != "") {
            $query = "SELECT task_id FROM tasks WHERE task_name = '$taskname'";
            $taskId = $mysqli->query($query)->fetch_row();
            for ($i = 0; $i < count($questions); $i++) {
                $option = $options[$i];
                $question = $questions[$i];

                $option = $mysqli->real_escape_string($option);
                $question = $mysqli->real_escape_string($question);

                $query = "INSERT INTO questions(task_id, question_option, question_text) VALUES ('$taskId[0]','$option' , '$question')";
                $mysqli->query($query);
            }
            echo "true";
        } else {
            echo "false";
        }
    }

}