/**
 * Created by Asiman on 08.02.2016.
 */
$(document).ready(function () {
    $.post("/php/tasks.php", {
        loadingpanel: "",
        loadingteachers : ""
    }, function (req) {
        var json = $.parseJSON(req);
        for (var i = 0; i < json.length; i++) {
            $("<option>" + json[i].l_name + "</option>").appendTo("#select-groups");
        }
    });
});