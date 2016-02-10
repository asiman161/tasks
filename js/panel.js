/**
 * Created by Asiman on 08.02.2016.
 */
$(document).ready(function () {
    $.post("/php/taskscontrolpanel.php", {
        loadingpanel: "",
        loadingteachers: ""
    }, function (req) {
        var json = $.parseJSON(req);
        for (var i = 0; i < json.length; i++) {
            $("<option>" + json[i].l_name + "</option>").appendTo("#select-groups").attr("data-teacher-id", json[i].teacher_id);
        }
    });

    $(document).on("click", "#select-groups option", function () {
        var teacherId = $(this).attr("data-teacher-id");
        //alert(teacherId);
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
                    $("<p class='tasks-list'>" + taskName + "|" + json[i].task_type + "|" + json[i].task_time + " минут" + "|" + json[i].create_date + "</p>").appendTo("#section-right-top").attr({
                        "data-task-id": json[i].task_id,
                        "data-task-time": json[i].task_time,
                        "data-task-name": taskName
                    });
                }
            }
        });
    });

});