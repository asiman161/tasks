<?php
//connection to the database
$mysqli = new mysqli("localhost", "u608271277_root", "bestpass", "u608271277_tests");

/* проверка соединения */
if ($mysqli->connect_errno) {
    printf("Не удалось подключиться: %s\n", $mysqli->connect_error);
    exit();
}
else echo 'норм';
//connection to the database
if(isset($_POST['text']) && isset($_POST['email']) && isset($_POST['sub'])){
    if(mail($_POST['email'], $_POST['sub'], $_POST['text'])){
    echo '<div class="alert alert-success">Отправлено.</div>';
    $email = $_POST['email'];
    $sub = $_POST['sub'];
    $text = $_POST['text'];
    $queryq = "INSERT INTO mail (email, sub, text) VALUES('".$email."', '".$sub."','".$text."')";
    /*echo $queryq;*/
    $mysqli->query($queryq);
    }
}
