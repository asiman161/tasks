$(document).ready(function () {

    /**
     * устанавливает имена всех групп в выпадающем меню, которые принадлежат данному преподавателю
     * */
    $.post("/php/taskscontrolpanel.php", {
        loadingpanel: "",
        loadinggroups : ""
    }, function (req) {
        var json = $.parseJSON(req);
        for (var i = 0; i < json.length; i++) {
            $("<option>" + json[i].group_name + "</option>").appendTo("#select-groups");
        }
    });

    /**
     * при клике на нужную работу выпадает список всех студентов, которые ВЫПОЛНИЛИ работу с данным именем
     * */
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
            $(".my-clear").remove();
            for (var i = 0; i < json.length; i++) {
                taskName = json[i].task_name;
                taskName = taskName.substr(5);
                $el.after("<li class='list-group-item node-treeview1 my-clear' style='background-color:#FCF8E3;border-bottom:1px solid #fff;'><span class='indent'></span><p class='students-tasks' data-task-id='" + json[i].task_id + "' data-student-id='" + json[i].student_id + "'>>> " + taskName + " | " + json[i].f_name + " " + json[i].l_name + "" + " <span class='badge pull-right'>" + json[i].rating + "</span></p></li>");
                //$el.after("<p class='students-tasks' data-task-id='" + json[i].task_id + "' data-student-id='" + json[i].student_id + "'>--" + taskName + "|" + json[i].l_name + "|" + json[i].f_name + "|" + json[i].rating + "</p>");
            }
        });
    });

    /**
     * меняет список работ по выбранной группе, отображает имена только тех работ, которые выполняла данная группа
     * */
    $(document).on("change", "#select-groups", function () {
        var groupstasks = $(this).val();
        var taskName = "";
        $.post("/php/taskscontrolpanel.php", {
            groupstasks: groupstasks
        }, function (req) {
            $("#sectionRight").empty();
            if (req != "") {
                var json = $.parseJSON(req);
                for (var i = 0; i < json.length; i++) {
                    taskName = json[i].task_name;
                    taskName = taskName.substr(5);
                    $("<li class='list-group-item node-treeview1 tasks-list'>" + taskName + " | " + json[i].task_type + " | " + json[i].create_date + "</li>").appendTo("#sectionRight");
                    //заменил p на li и вставил классы: list-group-item node-treeview1
                }
            }
        });
    });

    /**
     * отображает все работы текущего преподавателя
     * */
    $(document).on("click", "#show-all-tasks", function () {
        var taskName = "";
        $.post("/php/taskscontrolpanel.php", {
            alltasks: ""
        }, function (req) {
            $("#sectionRight").empty();
            var json = $.parseJSON(req);
            for (var i = 0; i < json.length; i++) {
                taskName = json[i].task_name;
                taskName = taskName.substr(5);
                $("<li class='list-group-item node-treeview1 tasks-list'>" + taskName + " | " + json[i].task_type + " | " + json[i].create_date + "</li>").appendTo("#sectionRight");
                //$("<p class='tasks-list'>" + taskName + "|" + json[i].task_type + "|" + json[i].create_date + "</p>").appendTo("#sectionRight");
            }
        });
    });
    $("#show-all-tasks").trigger("click");

    /**
     * отображение работ по дате их создания
     * */
    $(document).on("click", "#show-tasks-by-date", function () {
        var taskName = "";
        var year = $("#date-year").val();
        var month = $("#date-month").val();
        var day = $("#date-day").val();
        $("#sectionRight").empty();
        if (year != "" && month != "" && day != "")
            $.post("/php/taskscontrolpanel.php", {
                year: year,
                month: month,
                day: day
            }, function (req) {
                var json = $.parseJSON(req);
                for (var i = 0; i < json.length; i++) {
                    taskName = json[i].task_name;
                    taskName = taskName.substr(5);
                    $("<li class='list-group-item node-treeview1 tasks-list'>" + taskName + " | " + json[i].task_type + " | " + json[i].create_date + "</li>").appendTo("#sectionRight");
                }
            });
    });

    /**
     * отображает работу по имени
     * */
    $(document).on("click", "#show-task-by-name", function () {
        var taskName = "";
        var taskname = $("#task-name").val();
        $("#sectionRight").empty();
        if (taskname != "")
            $.post("/php/taskscontrolpanel.php", {
                taskname: taskname
            }, function (req) {
                var json = $.parseJSON(req);
                for (var i = 0; i < json.length; i++) {
                    taskName = json[i].task_name;
                    taskName = taskName.substr(5);
                    $("<li class='list-group-item node-treeview1 tasks-list'>" + taskName + " | " + json[i].task_type + " | " + json[i].create_date + "</li>").appendTo("#sectionRight");
                }
            });
    });

    /**
     * выход
     * */
    $(document).on("click", "#log-out", function(){
        $.post("/php/bd.php", {
            logout : ""
        }, function(req){
            if(req === "true"){
                window.location.href = "/teacher.html";
            }
        }) ;
    });
});

