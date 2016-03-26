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

/**
 * создано что бы заменить функцию jQuery на свою т.к. с этим именем мне было удобнее
 * */
function myAppendTo(data, to) {
    $(data).appendTo(to);
}

$(document).ready(function () {
    /**
     * запускается, когда студент начинает отвечать на задачу
     * */
    function timer() {
        timerTime--;
        if (timerTime < 0) {
            $("#answer-task").trigger("submit");
        }
        else {
            $("#timer-time").text("Осталось: " + timerTime + " секунд");
            myTimer = setTimeout(timer, 1000);
        }

    }

    /**
     * список работ, которые студент может выполнить
     * */
    $(document).on("click", "#section-right-top li", function () {
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
            //подтверждение, точно ли выбрана верная работа и готов ли студент её выполнить
            $.post("/php/taskspanel.php", {
                getQuestions: taskId,
                option: option
            }, function (req) {
                $("#section-left").empty();

                if (req != "") { //пришедший реквест обрабатывается и из него создается форма, в которой студент будет отвечать
                    var json = $.parseJSON(req);

                    $("<div style='text-align: center;font-size: 25px'><h1>" + taskName + "</h1><small id='timer-time'>Осталось:" + timerTime + " секунд" + "</small></div>").appendTo("#section-left");
                    clearTimeout(myTimer);
                    timer();
                    //тикающий таймер
                    myAppendTo("<form id='answer-task'></form>", "#section-left");
                    for (var i = 0; i < json.length; i++) {
                        numOfAnswers++;
                        questionsId[i] = json[i].question_id;
                        myAppendTo(" <div class='bs-callout bs-callout-info'><h4>" + (i + 1) + ")Вопрос - " + json[i].question_text + "</h4><textarea class='answer-textarea form-control' style='width: 97%'/></div>", "#answer-task");
                    }
                    myAppendTo("<input style='margin:10px 0 10px 10px;' type='submit' class='button button-success' value='Oтправить ответ'/>", "#answer-task");
                }
            });

            $.post("/php/answertask.php", { //дополнительная проверка, если был выбран неверный вариант, то чистит секцию для ответа и отключает таймер
                startanswertask: "",
                taskid: taskId,
                option: option
            }, function (req) {
                //alert(req);
                if (req === "false") {
                    alert("данная работа была уже начата(вы можете продолжить, если работа не была отправлена)");
                    //предупреждает студента, что работа выполнялась(сообщает о том, что если пересоздать работу для того, что бы сбросить таймер - бессмыслено)
                } else if (req === "wrong option") {
                    $("#section-left").empty();
                    clearTimeout(myTimer);
                    alert("такого варианта не существует")
                }
            });
        }
    });

    $(document).on("submit", "#answer-task", function () {//отправляет работу, отключает таймер
        clearTimeout(myTimer);
        var answers = "";
        var answerText = "";
        for (var i = 0; i < numOfAnswers; i++) {//получает значение из первого элемента, после чего его удаляет, и так пока все не отчистит
            answerText = $(".answer-textarea").val().trim();
            if (answerText == "")
                answerText = "пустой ответ";
            answers += answerText + "|";
            $(".answer-textarea:first").remove();
        }
        $("#section-left").empty();
        $.post("/php/answertask.php", {
            answers: answers,
            questionid: questionsId,
            taskid: taskId,
            option: option
        }, function () {
            alert("Работа была отправлена");
            $("#get-completed-tasks").trigger("click");//обновляет список выполненных работ
        });

        return false;
    });
});