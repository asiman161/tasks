$(document).ready(function () {
    $.post("/php/tasks.php", {
        loadingpanel: ""
    }, function (req) {
        var json = $.parseJSON(req);
        for (var i = 0; i < json.length; i++) {
            $("<option>" + json[i].group_name + "</option>").appendTo("#select-groups");
        }
    });

    $(document).on("click", ".tasks-list", function (event) {
        var $el = $(this);
        var taskslist = $(this).text();
        var taskName = "";
        taskslist = taskslist.substr(0, taskslist.indexOf("|"));
        $.post("/php/tasks.php", {
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

    $(document).on("click", ".students-tasks", function (event) {
        $(".task").remove();
        $("#sectionLeft").empty();
        $("<p class='task'>" + $(this).text() + "</p>").appendTo("#sectionLeft");
    });

    $(document).on("click", "#select-groups option", function () {
        var msg = $(this).text();
        var taskName = "";
        $.post("/php/tasks.php", {
            groupstasks: msg
        }, function (req) {
            $("#sectionRight").empty();
            if (req != "") {
                var json = $.parseJSON(req);
                for (var i = 0; i < json.length; i++) {
                    taskName = json[i].task_name;
                    taskName = taskName.substr(5);
                    $("<p class='tasks-list'>" + taskName + "|" + json[i].task_type + "|" + json[i].create_date + "</p>").appendTo("#sectionRight");
                }
            }
        });
    });

    $(document).on("click", "#show-all-tasks", function () {
        var taskName = "";
        $.post("/php/tasks.php", {
            alltasks: ""
        }, function (req) {
            $("#sectionRight").empty();
            var json = $.parseJSON(req);
            for (var i = 0; i < json.length; i++) {
                taskName = json[i].task_name;
                taskName = taskName.substr(5);
                $("<p class='tasks-list'>" + taskName + "|" + json[i].task_type + "|" + json[i].create_date + "</p>").appendTo("#sectionRight");
            }
        });
    });

    $(document).on("click", "#show-tasks-by-date", function () {
        var taskName = "";
        var year = $("#date-year").val();
        var month = $("#date-month").val();
        var day = $("#date-day").val();
        $("#sectionRight").empty();
        if (year != "" && month != "" && day != "")
            $.post("/php/tasks.php", {
                year: year,
                month: month,
                day: day
            }, function (req) {
                var json = $.parseJSON(req);
                for (var i = 0; i < json.length; i++) {
                    taskName = json[i].task_name;
                    taskName = taskName.substr(5);
                    $("<p class='tasks-list'>" + taskName + "|" + json[i].task_type + "|" + json[i].create_date + "</p>").appendTo("#sectionRight");
                }
            });
    });

    $(document).on("click", "#show-task-by-name", function () {
        var taskName = "";
        var taskname = $("#task-name").val();
        $("#sectionRight").empty();
        if (taskname != "")
            $.post("/php/tasks.php", {
                taskname: taskname
            }, function (req) {
                var json = $.parseJSON(req);
                for (var i = 0; i < json.length; i++) {
                    taskName = json[i].task_name;
                    taskName = taskName.substr(5);
                    $("<p class='tasks-list'>" + taskName + "|" + json[i].task_type + "|" + json[i].create_date + "</p>").appendTo("#sectionRight");
                }
            });
    });
});

