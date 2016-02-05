<?php
/**
 * Created by PhpStorm.
 * User: Asiman
 * Date: 05.02.2016
 * Time: 21:16
 */

$mysqli = new mysqli("localhost", "u608271277_root", "bestpass", "u608271277_tests");

/* проверка соединения */
if ($mysqli->connect_errno) {
    printf("Не удалось подключиться: %s\n", $mysqli->connect_error);
    exit();
}

if(isset($_POST['questions'])){
    $questions = explode("|", $_POST['questions']);
    print_r($questions);
    echo $_POST['taskname'];
}