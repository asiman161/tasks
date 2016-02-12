/**
 * Created by Asiman on 11.02.2016.
 */
var rating = .0;
var numOfAnswers = 0;
var counterButtonsClicks = 0;
var studentId = 0;
var taskId = 0;
var questionsId = [];
function myAppendTo(data, to) {
    $(data).appendTo(to);
}

$(document).on("click", ".students-tasks", function () {
    rating = .0;
    numOfAnswers = 0;
    counterButtonsClicks = 0;
    questionsId = [];
    $("#section-left").empty();
    taskId = $(this).attr("data-task-id");
    studentId = $(this).attr("data-student-id");

    $("<p class='task'>" + $(this).text() + "</p>").appendTo("#section-left");
    $.post("/php/checkanswer.php", {
        answers: "",
        taskid: taskId,
        studentid: studentId
    }, function (req) {
        if (req != "") {
            //alert(req);
            var json = $.parseJSON(req);
            myAppendTo("<p>время, за которое была выполнена работа " +  json[0].task_time + " секунд</p>", "#section-left");
            for (var i = 0; i < json.length; i++) {
                questionsId[i] = json[i].question_id;
                numOfAnswers++;
                myAppendTo("<p>" + (i + 1) + ") вопрос: " + json[i].question_text + "</p>", "#section-left");
                myAppendTo("<p>ответ: " + json[i].answer_text + "</p>", "#section-left");
                myAppendTo("<textarea class='teacher-answer' placeholder='описание ответа'/><br/>", "#section-left");
                myAppendTo("<section class='buttons-rating' data-t='aaa'>" +
                    "<input type='button' class='button-rating' value='1' data-click='false'/> " +
                    "<input type='button' class='button-rating' value='0.7' data-click='false'/>" +
                    "<input type='button' class='button-rating' value='0.3' data-click='false'/>" +
                    "<input type='button' class='button-rating' value='0' data-click='false'/>" +
                    "</section>", "#section-left");
            }
            myAppendTo("<br/><input type='button' id='set-rating' value='ОТПРАВИТЬ'/>", "#section-left");
            myAppendTo("<input type='button' id='drop-rating' value='СБРОС'/>", "#section-left");
        }
    });
});

$(document).on("click", ".button-rating", function () {
    if ($(this).attr("data-click") === 'false') {
        $(this).parent(".buttons-rating").children(".button-rating").attr("data-click", "true");
        rating += parseFloat($(this).val());
        counterButtonsClicks++;
    }
});

$(document).on("click", "#set-rating", function () {
    if (counterButtonsClicks === numOfAnswers) {
        /*var taskOptions = $("#num-of-options").val();
        for (var i = 0; i < numOfQuestions * taskOptions; i++) {
            questionText = $(".question-textarea").val() + $(".question-textarea").attr("name");
            if (questionText.length >= 5 && taskTime > 0 && taskTime <= 99 && taskOptions > 0 && taskOptions < 10) {
                questions += questionText + "|";
                $(".question-textarea:first").remove();
            } else {
                alert('минимальная длина вопроса не может быть меньше 5 символов или не указано(или слишком большое) время');
                return false;
            }
        }*/
        var teacherAnswers = [];
        var teacherAnswerText = "";
        for(var i = 0; i < numOfAnswers; i++){
            teacherAnswerText = $(".teacher-answer").val();
            if(teacherAnswerText == "") teacherAnswerText = "-";
            teacherAnswers[i] = teacherAnswerText;
            $(".teacher-answer:first").remove();
        }
        $.post("/php/checkanswer.php", {
            sendrating : rating,
            teacheranswers : teacherAnswers,
            questionid: questionsId,
            studentid : studentId,
            taskid : taskId
        }, function(req){
            $("#section-left").empty();
        });
    }
    else {
        alert("не все ответы оценены" + "|" + counterButtonsClicks + "|" + numOfAnswers);
    }
});

$(document).on("click", "#drop-rating", function () {
    rating = .0;
    counterButtonsClicks = 0;
    $(".button-rating").attr("data-click", "false");
});

/*
 $(document).on("click", ".students-tasks", function () {
 $(".task").remove();
 $("#section-left").empty();
 $("<p class='task'>" + $(this).text() + "</p>").appendTo("#section-left");
 });
 */


/*
 $(document).on("click", ".tasks-list", function () {
 var $el = $(this);
 var taskslist = $(this).text();
 var taskName = "";
 taskslist = taskslist.substr(0, taskslist.indexOf("|"));
 $.post("/php/taskscontrolpanel.php", {
 taskslist: taskslist
 }, function (req) {
 var json = $.parseJSON(req);
 $(".students-tasks").remove();
 for (var i = 0; i < json.length; i++) {
 taskName = json[i].task_name;
 taskName = taskName.substr(5);
 $el.after("<p class='students-tasks'>--" + taskName + "|" + json[i].l_name + "|" + json[i].f_name + "|" + json[i].rating + "</p>");
 }
 });
 });
 */
