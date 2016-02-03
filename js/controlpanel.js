$(document).ready(function () {
    $.post("/php/tasks.php", {
        loadingpanel : ""
    }, function(req){
        var json = $.parseJSON(req);
        for (var i = 0; i < json.length; i++) {
            $("<option>" + json[i].group_name + "</option>").appendTo("#select-groups");
        }
    });

    $(document).on("click", ".tasks-list", function (event) {
        var $el = $(this);
        var taskname = $(this).text();
        taskname = taskname.substr(0, taskname.indexOf("|"));
        $.post("/php/tasks.php", {
            taskname: taskname
        }, function (req) {
            var json = $.parseJSON(req);
            $(".students-tasks").remove();
            for (var i = 0; i < json.length; i++) {
                $el.after("<p class='students-tasks'>--" + json[i].task_name + "|" + json[i].l_name + "|" + json[i].f_name + "|" + json[i].rating + "</p>");
            }
        });
    });
    $(document).on("click", ".students-tasks", function(event){
        $(".task").remove();
        $("<p class='task'>" + $(this).text() + "</p>").appendTo("#sectionLeft");
    });
    $(document).on("click", "#select-groups option", function(){
        var msg = $(this).text();
        $.post("/php/tasks.php", {
            groupstasks: msg
        }, function (req) {
            $(".tasks-list").remove();
            $(".students-tasks").remove();
            var json = $.parseJSON(req);
            for (var i = 0; i < json.length; i++) {
                $("<p class='tasks-list'>" + json[i].task_name + "|" + json[i].task_type + "|" + json[i].create_date + "</p>").appendTo("#sectionRight");
            }
        });
    })
});

function showAllTasks() {
    $.post("/php/tasks.php", {
        alltasks: ""
    }, function (req) {
        $(".tasks-list").remove();
        $(".students-tasks").remove();
        var json = $.parseJSON(req);
        for (var i = 0; i < json.length; i++) {
            $("<p class='tasks-list'>" + json[i].task_name + "|" + json[i].task_type + "|" + json[i].create_date + "</p>").appendTo("#sectionRight");
        }
    });
}//

