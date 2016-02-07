<?php
//connection to the database
include "bd.php";
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
