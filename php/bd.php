<?php
/**
 * Created by PhpStorm.
 * User: Asiman
 * Date: 07.02.2016
 * Time: 20:36
 */

session_set_cookie_params(0);
session_start();
$mysqli = new mysqli("localhost", "u608271277_root", "bestpass", "u608271277_tests");
if ($mysqli->connect_errno) {
    echo "Не удалось подключиться: %s\n".$mysqli->connect_error;
    exit();
}