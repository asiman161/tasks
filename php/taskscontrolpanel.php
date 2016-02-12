<?php
/**
 * Created by PhpStorm.
 * User: Asiman
 * Date: 01.02.2016
 * Time: 20:11
 */

include "bd.php";

function posts($mysqli, $query)
{
    /** @noinspection PhpUndefinedMethodInspection */
    $result = $mysqli->query($query);
    $array_tasks = array();
    while ($data = mysqli_fetch_assoc($result)) {
        $array_tasks[] = $data;
    }
    echo json_encode($array_tasks);
}

if (isset($_POST['taskslist'])) {
    $taskslist = $_SESSION['teacherPrefix'] . $_POST['taskslist'];
    $query = "SELECT students.student_id,tasks.task_id,task_name,f_name, l_name, rating FROM tasks,students, students_tasks WHERE students_tasks.task_id = (SELECT task_id FROM tasks WHERE task_name='$taskslist') AND students.student_id = students_tasks.student_id AND students_tasks.task_id = tasks.task_id";
    posts($mysqli, $query);
} else if (isset($_POST['alltasks'])) {
    $query = "SELECT task_name, task_type, create_date FROM tasks WHERE teacher_id = (SELECT teacher_id FROM teachers WHERE user_login = '" . $_SESSION['teacherLogin'] . "')";
    posts($mysqli, $query);
} else if (isset($_POST['groupstasks'])) {
    //получаю все id заданий, который выполнялись указанной группой
    $query = "SELECT task_id FROM groups_tasks WHERE group_id = (SELECT group_id FROM groups WHERE group_name ='" . $_POST['groupstasks'] . "')";
    $result = $mysqli->query($query);
    $array_tasks = array();
    $query = "";
    while ($data = mysqli_fetch_assoc($result)) {
        //объединяю строки для получения запроса, в котором будет учавствовать сразу несколько тестов по разным id
        $query .= "SELECT task_name, task_type, create_date FROM tasks WHERE task_id = '" . $data['task_id'] . "' UNION ";
    }
    if (strlen($query) > 0) { //запрос может получиться пустым, если с указанной группой нет работ, что может привезти к ошибке
        $query = substr($query, 0, strlen($query) - 6);
        posts($mysqli, $query);
    }
}
if (isset($_POST['taskname'])) {
    $taskname = $_SESSION['teacherPrefix'] . $_POST['taskname'];
    $query = "SELECT task_name, task_type, create_date FROM tasks WHERE teacher_id = (SELECT teacher_id FROM teachers WHERE user_login = '" . $_SESSION['teacherLogin'] . "') AND task_name = '$taskname'";
    posts($mysqli, $query);
} else if (isset($_POST['year']) || isset($_POST['month']) || isset($_POST['day'])) {
    $date = $_POST['year'] . "-" . $_POST['month'] . "-" . $_POST['day'];
    $query = "SELECT task_name, task_type, create_date FROM tasks WHERE teacher_id = (SELECT teacher_id FROM teachers WHERE user_login = '" . $_SESSION['teacherLogin'] . "') AND create_date = '$date'";
    posts($mysqli, $query);

} else if (isset($_POST['loadingpanel'])) {
    if (isset($_POST['loadinggroups'])) {
        $teacherLogin = $_SESSION['teacherLogin'];
        $query = "SELECT group_id FROM groups_and_teachers WHERE teacher_id = (SELECT teacher_id FROM teachers WHERE user_login = '$teacherLogin');";
        $result = $mysqli->query($query);
        $array_tasks = array();
        $query = "";
        while ($data = mysqli_fetch_assoc($result)) {
            //объединяю строки для получения запроса, в котором будет учавствовать сразу несколько тестов по разным id
            $query .= "SELECT group_name FROM groups WHERE group_id = '" . $data['group_id'] . "' UNION ";
        }
        if (strlen($query) > 0) { //запрос может получиться пустым, если с указанной группой нет работ, что может привести к ошибке
            $query = substr($query, 0, strlen($query) - 6);
            posts($mysqli, $query);
        }
    } else if (isset($_POST['loadingteachers'])) {
        $studentLogin = $_SESSION['studentLogin'];
        $query = "SELECT teacher_id FROM groups_and_teachers WHERE group_id = (SELECT group_id FROM students WHERE user_login = '$studentLogin');";
        $result = $mysqli->query($query);
        $array_tasks = array();
        $query = "";
        while ($data = mysqli_fetch_assoc($result)) {
            //объединяю строки для получения запроса, в котором будет учавствовать сразу несколько тестов по разным id
            $query .= "SELECT teacher_id,l_name FROM teachers WHERE teacher_id = '" . $data['teacher_id'] . "' UNION ";
        }
        if (strlen($query) > 0) { //запрос может получиться пустым, если с указанной группой нет работ, что может привести к ошибке
            $query = substr($query, 0, strlen($query) - 6);
            posts($mysqli, $query);
        }
    }

}




