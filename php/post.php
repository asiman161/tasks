<?php

include "bd.php";

if(isset($_POST['text']) && isset($_POST['email']) && isset($_POST['sub'])){
    if(mail($_POST['email'], $_POST['sub'], $_POST['text'])){
    echo '<div class="alert alert-success">Отправлено.</div>';
    $email = $_POST['email'];
    $sub = $_POST['sub'];
    $text = $_POST['text'];
    $query = "INSERT INTO mail (email, sub, text) VALUES('".$email."', '".$sub."','".$text."')";
    $mysqli->query($query);
    }
}
