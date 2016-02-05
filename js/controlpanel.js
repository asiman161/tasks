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
        taskslist = taskslist.substr(0, taskslist.indexOf("|"));
        $.post("/php/tasks.php", {
            taskslist: taskslist
        }, function (req) {
            var json = $.parseJSON(req);
            $("#sectionLeft").empty();
            for (var i = 0; i < json.length; i++) {
                $el.after("<p class='students-tasks'>--" + json[i].task_name + "|" + json[i].l_name + "|" + json[i].f_name + "|" + json[i].rating + "</p>");
            }
        });
    });

    $(document).on("click", ".students-tasks", function (event) {
        $(".task").remove();
        $("<p class='task'>" + $(this).text() + "</p>").appendTo("#sectionLeft");
    });

    $(document).on("click", "#select-groups option", function () {
        var msg = $(this).text();
        $.post("/php/tasks.php", {
            groupstasks: msg
        }, function (req) {
            $("#sectionRight").empty();
            var json = $.parseJSON(req);
            for (var i = 0; i < json.length; i++) {
                $("<p class='tasks-list'>" + json[i].task_name + "|" + json[i].task_type + "|" + json[i].create_date + "</p>").appendTo("#sectionRight");
            }
        });
    });

    $(document).on("click", "#show-all-tasks", function () {
        $.post("/php/tasks.php", {
            alltasks: ""
        }, function (req) {
            $("#sectionRight").empty();
            var json = $.parseJSON(req);
            for (var i = 0; i < json.length; i++) {
                $("<p class='tasks-list'>" + json[i].task_name + "|" + json[i].task_type + "|" + json[i].create_date + "</p>").appendTo("#sectionRight");
            }
        });
    });

    $(document).on("click", "#show-tasks-by-date", function () {
        var year = $("#date-year").val();
        var month = $("#date-month").val();
        var day = $("#date-day").val();
        $("#sectionRight").empty();
        if(year != "" && month != "" && day != "")
        $.post("/php/tasks.php", {
            year: year,
            month: month,
            day: day
        }, function (req) {
            var json = $.parseJSON(req);
            for (var i = 0; i < json.length; i++) {
                $("<p class='tasks-list'>" + json[i].task_name + "|" + json[i].task_type + "|" + json[i].create_date + "</p>").appendTo("#sectionRight");
            }
        });
    });

    $(document).on("click", "#show-task-by-name", function () {
        var taskname = $("#task-name").val();
        $("#sectionRight").empty();
        if(taskname != "")
        $.post("/php/tasks.php", {
            taskname : taskname
        }, function (req) {
            var json = $.parseJSON(req);
            for (var i = 0; i < json.length; i++) {
                $("<p class='tasks-list'>" + json[i].task_name + "|" + json[i].task_type + "|" + json[i].create_date + "</p>").appendTo("#sectionRight");
            }
        });
    });
});

