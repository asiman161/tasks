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

/**
 * создает форму для проверки ответа студента
 * */
$(document).on("click", ".students-tasks", function () {
    rating = .0;
    numOfAnswers = 0;
    counterButtonsClicks = 0;
    questionsId = [];
    $("#section-left").empty();
    taskId = $(this).attr("data-task-id");
    studentId = $(this).attr("data-student-id");
    var taskNameStudent = $(this).text();
    taskNameStudent = taskNameStudent.substr(3, taskNameStudent.lastIndexOf(" ")-2);

    $.post("/php/checkanswer.php", {
        answers: "",
        taskid: taskId,
        studentid: studentId
    }, function (req) {
        if (req != "") {
            var json = $.parseJSON(req);
            $("<section class='panel panel-success'> <section class='panel-heading'>" + taskNameStudent + "</section> <section class='panel-body'>Время выполнения : " + json[0].task_time + " секунд<br /><p id='show-rating'>" + "Оценка : " + rating + "</p></p><input class='form-control' style='width: 25%' type='text' id='set-rating-input' placeholder='Оценка'/></section></section>").appendTo("#section-left");

            myAppendTo("<section class='bs-callout bs-callout-info' id='container-answers-students'></section>", "#section-left");
            for (var i = 0; i < json.length; i++) {
                questionsId[i] = json[i].question_id;
                numOfAnswers++;
                myAppendTo("<h4 style='margin: 2% 0 0 0'>" + (i + 1) + ") <b>Вопрос:</b> <span style='font-weight: normal'>" + json[i].question_text + "</span></h4>", "#container-answers-students");
                myAppendTo("<h4 style='margin: 1% 0 1% 0'><b>Ответ:</b><span style='font-weight: normal'> " + json[i].answer_text + "</span></h4>", "#container-answers-students");
                myAppendTo("<textarea class='teacher-answer form-control' style='width: 97%' placeholder='описание ответа'/><br/>", "#container-answers-students");
                myAppendTo("<section class='buttons-rating'>" +
                    "<input type='button' class='button-rating button button-default' style='width: 6%;' value='1' data-click='false'/> " +
                    "<input type='button' class='button-rating button button-default' style='width: 6%;' value='0.7' data-click='false'/>" +
                    "<input type='button' class='button-rating button button-default' style='width: 6%;' value='0.3' data-click='false'/>" +
                    "<input type='button' class='button-rating button button-default' style='width: 6%;' value='0' data-click='false'/>" +
                    "</section>", "#container-answers-students");
            }
            myAppendTo("<input type='button' id='set-rating' class='button button-success' style='margin: 2% 0 2% 2%;' value='ОТПРАВИТЬ'/>", "#section-left");
            myAppendTo("<input type='button' id='drop-rating' class='button button-danger' style='margin: 2% 0 2% 2%;' value='СБРОС'/>", "#section-left");
        }
    });
});

/**
 *  выставление оценки нажатием на одну из кнопок, при нажатии на одну из кнопок осталньые в группе с этой кнопку перестают работать, пока не произойдет сброс
 * */
$(document).on("click", ".button-rating", function () {
    if ($(this).attr("data-click") === 'false') {
        $(this).parent(".buttons-rating").children(".button-rating").attr("data-click", "true");
        rating += parseFloat($(this).val());
        counterButtonsClicks++;
        rating = parseFloat(parseFloat(rating).toFixed(1));
        if (!isNaN(rating)) {
            $("#show-rating").text("оценка: " + rating);
        }
    }
});

/**
 * установка оченки через поле ввода
 * */
$(document).on("change", "#set-rating-input", function () {
    rating = parseFloat($("#set-rating-input").val());
    $("#show-rating").text("оценка: " + rating);
});

/**
 * отправляет на сервер оцененную работу, если оценка выставлена через текстовое поле - кнопки игнорируются
 * если текстовое поле пустое, то берется значение, установленное через кнопки, но если были нажаты не все,
 * то вылетает алерт, сообщающий сколько было нажато кнопок из общего числа
 * */
$(document).on("click", "#set-rating", function () {
    if (counterButtonsClicks === numOfAnswers || rating === parseFloat($("#set-rating-input").val())) {
        rating.toFixed(1);
        var teacherAnswers = [];
        var teacherAnswerText = "";
        for (var i = 0; i < numOfAnswers; i++) {
            teacherAnswerText = $(".teacher-answer").val();
            if (teacherAnswerText == "") teacherAnswerText = "-";
            teacherAnswers[i] = teacherAnswerText;
            $(".teacher-answer:first").remove();
        }
        rating = parseFloat(parseFloat(rating).toFixed(1));
        alert(rating);
        $.post("/php/checkanswer.php", {
            sendrating: rating,
            teacheranswers: teacherAnswers,
            questionid: questionsId,
            studentid: studentId,
            taskid: taskId
        }, function () {
            $("#section-left").empty();
        });
    }
    else {
        alert("не все ответы оценены" + "|" + counterButtonsClicks + "|" + numOfAnswers);
    }
});


/**
 * кнопка сброса, делает все кнопки для выставленния оценки активными
 * */
$(document).on("click", "#drop-rating", function () {
    rating = .0;
    counterButtonsClicks = 0;
    $(".button-rating").attr("data-click", "false");
    $("#set-rating-input").val("");
    $("#show-rating").text("оценка: " + rating);
});
