/**
 * Created by Asiman on 11.02.2016.
 */
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
