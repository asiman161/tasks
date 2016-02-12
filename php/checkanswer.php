<?php
/**
 * Created by PhpStorm.
 * User: Asiman
 * Date: 11.02.2016
 * Time: 22:16
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

if (isset($_POST)) {
    if (isset($_POST['answers'])) {
        $taskId = $_POST['taskid'];
        $studentId = $_POST['studentid'];
        $query = "SELECT question_text, control_answers.question_id, control_answers.task_id, control_answers.student_id, task_option, answer_text, task_time FROM control_answers, tasks_completed, questions WHERE control_answers.student_id = '$studentId'  AND tasks_completed.task_time = (SELECT task_time FROM tasks_completed WHERE student_id = '$studentId' AND task_id = '$taskId') AND questions.question_id = control_answers.question_id AND control_answers.task_option = (SELECT DISTINCT task_option FROM control_answers WHERE student_id = '$studentId' AND task_id = '$taskId')";
        posts($mysqli, $query);
    } else if (isset($_POST['sendrating'])) {
        $rating = $_POST['sendrating'];
        $teacherAnswers = $_POST['teacheranswers'];
        $questionsId = $_POST['questionid'];
        $studentId = $_POST['studentid'];
        $taskId = $_POST['taskid'];

        $query = "UPDATE students_tasks SET rating = '$rating' WHERE student_id = '$studentId' AND task_id = '$taskId'";
        $mysqli->query($query);
        for($i = 0; $i < count($teacherAnswers); $i++){
            $answer = $teacherAnswers[$i];
            $questionId = $questionsId[$i];
            $query = "UPDATE control_answers SET answer_teacher_text = '$answer' WHERE question_id = '$questionId' AND student_id = '$studentId'";
            $mysqli->query($query);
        }
    }
}