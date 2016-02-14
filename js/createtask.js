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
    $("#section-left").empty();
    if (numOfQuestions > 0) {
        myAppendTo("<form id='create-task'>", "#section-left");
        myAppendTo("<input type='text' id='name-of-task' pattern='.{5,115}' placeholder='название работы' required/>", "#section-left #create-task");
        for (var i = 0; i < numOfOptions; i++) {
            if (i != 0)
                myAppendTo("<p>---</p>", "#section-left #create-task");
            for (var j = 0; j < numOfQuestions; j++) {
                myAppendTo("<p class='question-p'>" + (i + 1) + ")вариант " + (j + 1) + ")вопрос" + "</p>", "#section-left #create-task");
                myAppendTo("<textarea class='question-textarea' name=" + "'" + (i + 1) + "'" + " placeholder='текст вопроса' required/>", "#section-left #create-task");
            }
        }
        myAppendTo("<input type='submit' value='создать контрольную'/>", "#section-left #create-task");
    }
});

$(document).on("submit", "#create-task", function () {
    var questions = [];
    var taskOptionsMas = [];
    var questionText = "";
    var taskTime = parseInt($("#time-of-questions").val());
    var taskname = $("#name-of-task").val();
    var taskOptions = $("#num-of-options").val();
    for (var i = 0; i < numOfQuestions * taskOptions; i++) {
        questionText = $(".question-textarea").val();
        if (questionText.length >= 5 && taskTime > 0 && taskTime <= 99 && taskOptions > 0 && taskOptions < 20) {
            questions[i] = questionText;
            taskOptionsMas[i] = $(".question-textarea").attr("name");
            $(".question-textarea:first").remove();
        } else {
            alert('минимальная длина вопроса не может быть меньше 5 символов или не указано(или слишком большое) время');
            return false;
        }
    }
    $("#section-left").empty();
    numOfQuestions = 0;
    $.post("/php/createtask.php", {
        taskname: taskname,
        questions: questions,
        tasktype: "контрольная",
        tasktime: taskTime,
        taskoptionsmas : taskOptionsMas
    }, function (req) {
        alert(req);
        if (req === 'false')
            alert('ошибка при создании\nвозможно задание с этим именем уже существует');
        else
            alert('задание создано')
    });
    return false;
});
