/**
 * Created by Asiman on 05.02.2016.
 */


var numOfQuestions = 0;

function myAppendTo(data, to) {
    $(data).appendTo(to);
}

$(document).on("click", "#make-control-task", function () {
    numOfQuestions = parseInt($("#num-of-questions").val());
    if (numOfQuestions > 20) numOfQuestions = 20;
    $("#sectionLeft").empty();
    if (numOfQuestions > 0) {
        myAppendTo("<form id='createTask'>", "#sectionLeft");
        myAppendTo("<input type='text' id='name-of-task' pattern='.{5,120}' placeholder='название работы' required/>", "#sectionLeft #createTask");
        for (var i = 0; i < numOfQuestions; i++) {
            myAppendTo("<p class='question-p'>" + (i + 1) + ")вопрос" + "</p>", "#sectionLeft #createTask");
            myAppendTo("<textarea class='question-input' placeholder='текст вопроса' required/>", "#sectionLeft #createTask");
        }
        myAppendTo("<input type='submit' value='создать контрольную'>", "#sectionLeft #createTask");
    }
});

$(document).on("submit", "#createTask", function () {
    var questions = "";
    var questionTest = "";
    var taskTime = parseInt($("#time-of-questions").val());
    var taskname = $("#name-of-task").val();
    for (var i = 0; i < numOfQuestions; i++) {
        questionTest = $(".question-input").val();
        if (questionTest.length >= 5 && taskTime > 0) {
            questions += questionTest + "|";
            $(".question-input:first").remove();
        } else {
            alert('минимальная длина вопроса не может быть меньше 5 символов или не указано время');
            return false;
        }
    }
    $("#sectionLeft").empty();
    questions = questions.substring(0, questions.length - 1);
    numOfQuestions = 0;
    $.post("/php/createtask.php", {
        taskname: taskname,
        questions: questions,
        tasktype: "контрольная",
        tasktime: taskTime
    }, function (req) {
        if (req === 'false')
            alert('ошибка при создании\nвозможно задание с этим именем уже существует');
        else
            alert('задание создано')
    });
});
