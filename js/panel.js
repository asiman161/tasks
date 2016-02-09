/**
 * Created by Asiman on 08.02.2016.
 */
$(document).ready(function () {
    $.post("/php/taskscontrolpanel.php", {
        loadingpanel: "",
        loadingteachers : ""
    }, function (req) {
        var json = $.parseJSON(req);
        for (var i = 0; i < json.length; i++) {
            $("<option>" + json[i].l_name + "</option>").appendTo("#select-groups");
        }
    });

    $(document).on("click", "#select-groups option", function () {
        var teachername = $(this).text();
        var taskName = "";
        $.post("/php/taskspanel.php", {
            allTasksByTeacher : "",
            teacherName : teachername
        }, function (req) {
            $("#sectionRightTop").empty();
            if (req != "") {
                var json = $.parseJSON(req);
                for (var i = 0; i < json.length; i++) {
                    taskName = json[i].task_name;
                    taskName = taskName.substr(5);
                    $("<p class='tasks-list'>" + taskName + "|" + json[i].task_type + "|" + json[i].create_date + "</p>").appendTo("#sectionRightTop");
                }
            }
        });
    });

});