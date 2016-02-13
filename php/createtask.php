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
        //создание вопросов реализовано через разбиение строки, в которой хранятся вопросы и варианты, другие подобные случаи реализованы
        //через отправку массива с данными(на момемент написания лучше способа не придумал)

        $questions = explode("|", $_POST['questions']);//TODO: сделать вопросы нормально, вопросы и варианты передавать в объектах, а не строкой

        //$login = $_SESSION['teacherLogin']; //TODO: удалить после проверка корректности вывода
        $teacherId = $_SESSION['teacherId'];
        $tasktype = $_POST['tasktype'];
        $tasktime = $_POST['tasktime'];
        $taskname = $_SESSION['teacherPrefix'].$_POST['taskname'];
        $date = date('Y-m-d');
        $query = "INSERT INTO tasks(teacher_id, task_type, task_time, task_name, create_date) VALUES ('$teacherId', '$tasktype', '$tasktime', '$taskname', '$date')";
        //$query = "INSERT INTO tasks(teacher_id, task_type, task_time, task_name, create_date) VALUES ((SELECT teacher_id FROM teachers WHERE user_login ='$login'), '$tasktype', '$tasktime', '$taskname', '$date')";
        $res = $mysqli->query($query);
        if ($res != "") {
            $query = "SELECT task_id FROM tasks WHERE task_name = '$taskname'";
            $taskId = $mysqli->query($query)->fetch_row();
            foreach ($questions as $question) {
                $option = substr($question, strlen($question)-1);
                $question = substr($question, 0, strlen($question)-1);
                $query = "INSERT INTO questions(task_id, question_option, question_text) VALUES ('$taskId[0]','$option' , '$question')";
                $mysqli->query($query);
            }
            echo "true";
        } else {
            echo "false";
        }
    }

}