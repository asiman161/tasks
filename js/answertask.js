/**
 * Created by Asiman on 10.02.2016.
 */
var numOfAnswers = 0;
var taskId = 0;
var questionId = [];
function myAppendTo(data, to) {
    $(data).appendTo(to);
}

$(document).ready(function () {
    $(document).on("click", "#section-right-top p", function () {
        numOfAnswers = 0;
        questionId = [];
        taskId = $(this).attr("data-task-id");
        var taskName = $(this).attr("data-task-name");
        var taskTime = $(this).attr("data-task-time");
        var option = parseInt($("#get-option").val());
        if (typeof option !== 'number' || isNaN(option)) {
            alert("неверно указан вариант");
            return;
        }
        if (confirm("Для работы \"" + taskName + "\" отведено " + taskTime + " минут\nВаш вариант " + option + "\n" + "Вы готовы начать?")) {
            $.post("/php/taskspanel.php", {
                getQuestions: taskId,
                option: option
            }, function (req) {
                $("#section-left").empty();
                if (req != "") {
                    var json = $.parseJSON(req);
                    myAppendTo("<p>" + taskName + "</p>", "#section-left");
                    myAppendTo("<form id='answer-task'></form>", "#section-left");
                    for (var i = 0; i < json.length; i++) {
                        numOfAnswers++;
                        questionId[i] = json[i].question_id;
                        myAppendTo("<p>" + (i + 1) + ")вопрос - " + json[i].question_text + "</p>", "#answer-task");
                        myAppendTo("<textarea class='answer-textarea'>", "#answer-task")
                    }
                    myAppendTo("<input type='submit' value='отправить ответ'/>", "#answer-task")
                }
            });
            $.post("/php/answertask.php", {
                startanswertask: "",
                taskid: taskId
            }, function (req) {
                //alert(req);
                if (req === "false")
                    alert("данная работа была уже начата")
            });
        } else {
            //alert("not ready")
        }
    });

    $(document).on("submit", "#answer-task", function () {
        var answers = "";
        var answerText = "";
        for (var i = 0; i < numOfAnswers; i++) {
            answerText = $(".answer-textarea").val().trim();
            if (answerText == "")
                answerText = "пустой ответ";
            answers += answerText + "|";
            $(".answer-textarea:first").remove();
        }
        $.post("/php/answertask.php", {
            answers: answers,
            questionid: questionId,
            taskid: taskId
        }, function (req) {
            //alert(req);
        });
        return false;
    });
});