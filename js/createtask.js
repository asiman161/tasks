/**
 * Created by Asiman on 05.02.2016.
 */


var numOfQuestions = 0;
var numOfOptions = 0;
function myAppendTo(data, to) {
    $(data).appendTo(to);
}

$(document).on("click", "#make-control-task", function () {
    numOfQuestions = parseInt($("#num-of-questions").val());
    numOfOptions = parseInt($("#num-of-options").val());
    if (numOfQuestions > 20) numOfQuestions = 20;
    $("#sectionLeft").empty();
    if (numOfQuestions > 0) {
        myAppendTo("<form id='createTask'>", "#sectionLeft");
        myAppendTo("<input type='text' id='name-of-task' pattern='.{5,115}' placeholder='название работы' required/>", "#sectionLeft #createTask");
        for (var i = 0; i < numOfOptions; i++) {
            if (i != 0)
                myAppendTo("<p>---</p>", "#sectionLeft #createTask");
            for (var j = 0; j < numOfQuestions; j++) {
                myAppendTo("<p class='question-p'>" + (i + 1) + ")вариант " + (j + 1) + ")вопрос" + "</p>", "#sectionLeft #createTask");
                myAppendTo("<textarea class='question-input' name=" + "'" + (i+1) + "'" + " placeholder='текст вопроса' required/>", "#sectionLeft #createTask");
            }
        }
        myAppendTo("<input type='submit' value='создать контрольную'>", "#sectionLeft #createTask");
    }
});

$(document).on("submit", "#createTask", function () {
    var questions = "";
    var questionTest = "";
    var taskTime = parseInt($("#time-of-questions").val());
    var taskname = $("#name-of-task").val();
    var taskOptions = $("#num-of-options").val();
    for (var i = 0; i < numOfQuestions * taskOptions; i++) {
        questionTest = $(".question-input").val() + $(".question-input").attr("name");
        if (questionTest.length >= 5 && taskTime > 0 && taskTime <= 99 && taskOptions > 0 && taskOptions < 10) {
            questions += questionTest + "|";
            $(".question-input:first").remove();
        } else {
            alert('минимальная длина вопроса не может быть меньше 5 символов или не указано(или слишком большое) время');
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