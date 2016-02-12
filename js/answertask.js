/**
 * Created by Asiman on 10.02.2016.
 */
var numOfAnswers = 0;
var taskId = 0;
var questionsId = [];
var option = 0;
var taskName = "";
function myAppendTo(data, to) {
    $(data).appendTo(to);
}

$(document).ready(function () {
    $(document).on("click", "#section-right-top p", function () {

        ///////delete
        //TODO: удалить эту часть кода, создана временно для презентации альфы
        var taskslist = $(this).text();
        taskName = "";
        taskslist = taskslist.substr(0, taskslist.indexOf("|"));
        $.post("/php/taskscontrolpanel.php", {
            taskslist: taskslist
        }, function (req) {
            var json = $.parseJSON(req);
            $(".students-tasks").remove();
            for (var i = 0; i < json.length; i++) {
                taskName = json[i].task_name;
                taskName = taskName.substr(5);
                myAppendTo("<p class='students-tasks' data-task-id='" + json[i].task_id + "' data-student-id='" + json[i].student_id + "'>--" + taskName + "|" + json[i].l_name + "|" + json[i].f_name + "|" + json[i].rating + "</p>", "#section-right-bottom")
            }
        });
        ///////delete


        numOfAnswers = 0;
        questionsId = [];
        taskId = $(this).attr("data-task-id");
        taskName = $(this).attr("data-task-name");
        var taskTime = $(this).attr("data-task-time");
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
                if (req != "") {
                    var json = $.parseJSON(req);
                    myAppendTo("<p>" + taskName + "</p>", "#section-left");
                    myAppendTo("<form id='answer-task'></form>", "#section-left");
                    for (var i = 0; i < json.length; i++) {
                        numOfAnswers++;
                        questionsId[i] = json[i].question_id;
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
        //alert(option);
        //alert(questionsId);
        $.post("/php/answertask.php", {
            answers: answers,
            questionid: questionsId,
            taskid: taskId,
            option : option
        }, function (req) {
            //alert(taskId);
            $("#section-left").empty();
        });




        return false;
    });
});