<?php
/**
 * Created by PhpStorm.
 * User: Asiman
 * Date: 05.02.2016
 * Time: 21:16
 */
session_set_cookie_params(0);
session_start();

$mysqli = new mysqli("localhost", "u608271277_root", "bestpass", "u608271277_tests");

/* проверка соединения */
if ($mysqli->connect_errno) {
    printf("Не удалось подключиться: %s\n", $mysqli->connect_error);
    exit();
}

if (isset($_POST['questions'])) {
    $query = "SELECT user_login FROM teachers WHERE user_login='" . $_SESSION['teacherLogin'] . "'";
    $login = $mysqli->query($query)->fetch_row();
    if ($login[0] == $_SESSION['teacherLogin'] && $login[0] != "") {
        $questions = explode("|", $_POST['questions']); //important

        $login = $_SESSION['teacherLogin'];
        $tasktype = $_POST['tasktype'];
        $tasktime = $_POST['tasktime'];
        $taskname = $_POST['taskname'];
        $date = date('Y-m-d');
        $query = "INSERT INTO tasks VALUES (NULL, (SELECT teacher_id FROM teachers WHERE user_login ='$login'), '$tasktype', '$tasktime', '$taskname', '$date')";
        $res = $mysqli->query($query);
        if ($res != "") {
            $query = "SELECT task_id FROM tasks WHERE task_name = '" . $_POST['taskname'] . "'";
            $taskid = $mysqli->query($query)->fetch_row();
            foreach ($questions as $question) {
                $query = "INSERT INTO questions VALUES (NULL, '$taskid[0]', '$question')";
                $mysqli->query($query);
            }
            echo "true";
        } else {
            echo "false";
        }
    }
    /*if($res = mysqli->query(...)) //проверка прошел ли sql запрос
    echo "\n---" . "good" . "$res" ."---\n";
    else echo "\n---" . "bad" . "$res" . "---\n";*/
}