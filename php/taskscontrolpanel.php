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

    $taskslist = $mysqli->real_escape_string($taskslist);

    $query = "SELECT students.student_id,tasks.task_id,task_name,f_name, l_name, rating FROM tasks,students, students_tasks WHERE students_tasks.task_id = (SELECT task_id FROM tasks WHERE task_name='$taskslist') AND students.student_id = students_tasks.student_id AND students_tasks.task_id = tasks.task_id ORDER BY rating DESC";
    posts($mysqli, $query);
} else if (isset($_POST['alltasks'])) {
    $teacherId = $_SESSION['teacherId'];

    $teacherId = $mysqli->real_escape_string($teacherId);

    $query = "SELECT task_name, task_type, create_date FROM tasks WHERE teacher_id = '$teacherId' ORDER BY task_id DESC";
    posts($mysqli, $query);
} else if (isset($_POST['groupstasks'])) {
    //получаю все id заданий, который выполнялись указанной группой
    $groupName = $_POST['groupstasks'];

    $groupName = $mysqli->real_escape_string($groupName);

    $query = "SELECT task_id FROM groups_tasks WHERE group_id = (SELECT group_id FROM groups WHERE group_name ='$groupName') ORDER BY task_id DESC";
    $result = $mysqli->query($query);
    $array_tasks = array();
    $query = "";
    while ($data = mysqli_fetch_assoc($result)) {
        //объединяю строки для получения запроса, в котором будет участвовать сразу несколько тестов по разным id
        $query .= "SELECT task_name, task_type, create_date FROM tasks WHERE task_id = '" . $data['task_id'] . "' UNION ";
    }
    if (strlen($query) > 0) { //запрос может получиться пустым, если с указанной группой нет работ, что может привести к ошибке
        $query = substr($query, 0, strlen($query) - 6);
        posts($mysqli, $query);
    }
}
if (isset($_POST['taskname'])) {
    $taskname = $_SESSION['teacherPrefix'] . $_POST['taskname'];
    $teacherId = $_SESSION['teacherId'];

    $taskname = $mysqli->real_escape_string($taskname);
    $teacherId = $mysqli->real_escape_string($teacherId);

    $query = "SELECT task_name, task_type, create_date FROM tasks WHERE teacher_id = '$teacherId' AND task_name = '$taskname'";
    posts($mysqli, $query);
} else if (isset($_POST['year']) || isset($_POST['month']) || isset($_POST['day'])) {
    $date = $_POST['year'] . "-" . $_POST['month'] . "-" . $_POST['day'];
    $teacherId = $_SESSION['teacherId'];

    $date = $mysqli->real_escape_string($date);
    $teacherId = $mysqli->real_escape_string($teacherId);

    $query = "SELECT task_id,task_name, task_type, create_date FROM tasks WHERE teacher_id = '$teacherId' AND create_date = '$date' ORDER BY task_id DESC";
    posts($mysqli, $query);

} else if (isset($_POST['loadingpanel'])) {
    if (isset($_POST['loadinggroups'])) {
        $teacherId = $_SESSION['teacherId'];

        $teacherId = $mysqli->real_escape_string($teacherId);

        $query = "SELECT group_id FROM groups_and_teachers WHERE teacher_id = '$teacherId'";
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
        $studentId = $_SESSION['studentId'];

        $studentId = $mysqli->real_escape_string($studentId);

        $query = "SELECT teacher_id FROM groups_and_teachers WHERE group_id = (SELECT group_id FROM students WHERE student_id = '$studentId');";
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

} else if (isset($_POST['changePassword'])) {
    $password = $mysqli->real_escape_string($_POST['password']);
    $login = $_SESSION['teacherLogin'];
    if ($mysqli->query("UPDATE teachers SET user_password = '$password' WHERE user_login ='$login'")) {
        echo "Пароль сменен";
    } else {
        echo "Произошла ошибка при смене пароля, повторите попытку";
    }

};




