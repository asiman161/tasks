/**
 * Created by Asiman on 08.02.2016.
 */
var teachers = [];

$(document).ready(function () {
    $.post("/php/taskscontrolpanel.php", {
        loadingpanel: "",
        loadingteachers: ""
    }, function (req) {
        if(req != "") {
            var json = $.parseJSON(req);
            for (var i = 0; i < json.length; i++) {
                teachers[json[i].l_name] = json[i].teacher_id;
                $("<option>" + json[i].l_name + "</option>").appendTo("#select-groups").attr("data-teacher-id", json[i].teacher_id);
            }
            $("#select-groups").trigger("change");
        }
    });

    $(document).on("change", "#select-groups", function () {
        var teacherId = teachers[$(this).val()];
        var taskName = "";
        $.post("/php/taskspanel.php", {
            allTasksByTeacher: "",
            teacherId: teacherId
        }, function (req) {
            $("#section-right-top").empty();
            if (req != "") {
                var json = $.parseJSON(req);
                for (var i = 0; i < json.length; i++) {
                    taskName = json[i].task_name;
                    taskName = taskName.substr(5);
                    $("<li class='list-group-item tasks-list'>" + taskName + " | " + json[i].task_type + " | " + json[i].task_time + " минут" + " | " + json[i].create_date + "</li>").appendTo("#section-right-top").attr({
                        "data-task-id": json[i].task_id,
                        "data-task-time": json[i].task_time,
                        "data-task-name": taskName
                    });

                    /*$("<p class='tasks-list'>" + taskName + "|" + json[i].task_type + "|" + json[i].task_time + " минут" + "|" + json[i].create_date + "</p>").appendTo("#section-right-top").attr({
                        "data-task-id": json[i].task_id,
                        "data-task-time": json[i].task_time,
                        "data-task-name": taskName
                    });*/
                }
            }
        });
    });


    $(document).on("click", "#get-completed-tasks", function () {
        $("#section-right-bottom").empty();
        $("#select-groups").trigger("change");
        var taskName = "";
        $.post("/php/taskspanel.php", {
            getcompletedtasks: ""
        }, function (req) {
            if (req != "") {
                var json = $.parseJSON(req);
                for (var i = 0; i < json.length; i++) {
                    taskName = json[i].task_name;
                    taskName = taskName.substr(5);

                    /*$("<p class='completed-tasks-list'>" + taskName + "|" + json[i].create_date + "|" + json[i].task_time + " минут|" + json[i].rating + "</p>").appendTo("#section-right-bottom").attr({
                        "data-task-id": json[i].task_id,
                        "data-task-time": json[i].task_time,
                        "data-task-name": taskName
                    });*/

                    /*<li class='list-group-item'>
                        <span class='badge'>" + json[i].rating + "</span>*/


                    $("<li class='list-group-item completed-tasks-list'><span class='badge '>" + json[i].rating + "</span>" + taskName + "<small class='pull-right' style='margin-right:5%'>" + json[i].create_date + "</small></li>").appendTo("#section-right-bottom").attr({
                        "data-task-id": json[i].task_id,
                        "data-task-time": json[i].task_time,
                        "data-task-name": taskName
                    });

                }
            }
        });
    });

    $("#get-completed-tasks").trigger("click"); //вызов списка справа с помощью эмуляция события

    $(document).on("click", ".completed-tasks-list", function () {
        //alert($(this).val());
        //alert($(this).text());
        $("#section-left").empty();
        var taskId = $(this).attr("data-task-id");
        $.post("/php/taskspanel.php", {
            showstudentanswers: "",
            taskid: taskId
        }, function (req) {
            if (req != "") {
                var json = $.parseJSON(req);
                for (var i = 0; i < json.length; i++) {
                    if(typeof json[i].answer_teacher_text === "object"){
                        json[i].answer_teacher_text = "-";
                    }
                    $("<div class='panel panel-warning'> <div class='panel-heading'><span style='background-color:#5CB85C;' class='badge'>" + (i+1) + "</span><b> " + json[i].question_text + "</b></div> <div class='panel-body'><b>Ваш ответ:</b> " + json[i].answer_text + "<br /><br /><b>Ответ преподавателя:</b> " + json[i].answer_teacher_text + "</div> </div>").appendTo("#section-left");
                    //$("<p >" + (i+1) + ")вопрос: " + json[i].question_text + "</p>").add("<p>" + "ваш ответ: " + json[i].answer_text + "</p>").add("<p>" + "ответ преподавателя: " + json[i].answer_teacher_text + "</p><br/>").appendTo("#section-left");
                }
            }
        });
    });

    $(document).on("click", "#log-out", function(){
        $.post("/php/bd.php", {
            logout : ""
        }, function(req){
            if(req === "true"){
                window.location.href = "/index.html";
            }
        }) ;
    });
});