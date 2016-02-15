/**
 * Created by Asiman on 10.02.2016.
 */
var numOfAnswers = 0;
var taskId = 0;
var questionsId = [];
var option = 0;
var taskName = "";
var timerTime = 0;
var myTimer;

function myAppendTo(data, to) {
    $(data).appendTo(to);
}

$(document).ready(function () {

    function timer() {
        timerTime--;
        if (timerTime < 0) {
            $("#answer-task").trigger("submit");
            alert('время кончилось, работа была отправлена');
        }
        else {
            $("#timer-time").text("Осталось: " + timerTime + " секунд");
            myTimer = setTimeout(timer, 1000);
        }

    }

    $(document).on("click", "#section-right-top li", function () {
    //$(document).on("click", "#section-right-top p", function () {

        numOfAnswers = 0;
        questionsId = [];
        taskId = $(this).attr("data-task-id");
        taskName = $(this).attr("data-task-name");
        var taskTime = $(this).attr("data-task-time");
        timerTime = taskTime * 60 + 1; //кол-во секунд
        option = parseInt($("#get-option").val());
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
                /*$("<div class='page-header'><h1><small id='timer-time'>Осталось:" + timerTime + " секунд" + "</small></h1></div>").appendTo("#section-left");
                clearTimeout(myTimer);
                timer();*/
                if (req != "") {
                    var json = $.parseJSON(req);
                    //myAppendTo("<p>" + taskName + "</p>", "#section-left");
                    $("<div class='page-header'><h1 style='text-align: center;'>" + taskName + " <small id='timer-time'>Осталось:" + timerTime + " секунд" + "</small></h1></div>").appendTo("#section-left");
                    clearTimeout(myTimer);
                    timer();
                    myAppendTo("<form id='answer-task'></form>", "#section-left");
                    for (var i = 0; i < json.length; i++) {
                        numOfAnswers++;
                        questionsId[i] = json[i].question_id;
                        myAppendTo(" <div class='bs-callout bs-callout-info'><h4>" + (i + 1) + ")Вопрос - " + json[i].question_text + "</h4>" + "<textarea class='answer-textarea form-control'/></div>", "#answer-task");
                    }
                    myAppendTo("<input style='margin:10px 0 10px 10px;' type='submit' class='btn btn-success' value='Oтправить ответ'/>", "#answer-task");
                }
            });
/*
            $.post("/php/taskspanel.php", {
                getQuestions: taskId,
                option: option
            }, function (req) {
                $("#section-left").empty();
                $("<p id='timer-time'>времени осталось: " + timerTime + " секунд" + "</p>").appendTo("#section-left");
                clearTimeout(myTimer);
                timer();
                if (req != "") {
                    var json = $.parseJSON(req);
                    myAppendTo("<p>" + taskName + "</p>", "#section-left");
                    myAppendTo("<form id='answer-task'></form>", "#section-left");
                    for (var i = 0; i < json.length; i++) {
                        numOfAnswers++;
                        questionsId[i] = json[i].question_id;
                        myAppendTo("<p>" + (i + 1) + ")вопрос - " + json[i].question_text + "</p>", "#answer-task");
                        myAppendTo("<textarea class='answer-textarea'>", "#answer-task");
                    }
                    myAppendTo("<input type='submit' value='отправить ответ'/>", "#answer-task");
                }
            });
*/
            $.post("/php/answertask.php", {
                startanswertask: "",
                taskid: taskId,
                option: option
            }, function (req) {
                //alert(req);
                if (req === "false") {
                    alert("данная работа была уже начата(вы можете продолжить, если работа не была отправлена)");
                } else if (req === "wrong option") {
                    $("#section-left").empty();
                    clearTimeout(myTimer);
                    alert("такого варианта не существует")
                }
            });
        } else {
            //alert("not ready")
        }
    });

    $(document).on("submit", "#answer-task", function () {
        clearTimeout(myTimer);
        var answers = "";
        var answerText = "";
        for (var i = 0; i < numOfAnswers; i++) {
            answerText = $(".answer-textarea").val().trim();
            if (answerText == "")
                answerText = "пустой ответ";
            answers += answerText + "|";
            $(".answer-textarea:first").remove();
        }
        //alert(option);
        //alert(questionsId);
        $.post("/php/answertask.php", {
            answers: answers,
            questionid: questionsId,
            taskid: taskId,
            option: option
        }, function () {
            //alert(taskId);
            $("#section-left").empty();
            $("#get-completed-tasks").trigger("click");
        });

        return false;
    });
});