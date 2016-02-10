/**
 * Created by Asiman on 10.02.2016.
 */
function myAppendTo(data, to) {
    $(data).appendTo(to);
}

$(document).ready(function(){
    $(document).on("click", "#section-right-top p", function () {
        var taskId = $(this).attr("data-task-id");
        var taskName = $(this).attr("data-task-name");
        var taskTime = $(this).attr("data-task-time");
        var option = parseInt($("#get-option").val());
        if(typeof option !== 'number' || isNaN(option)){
            alert("неверно указан вариант");
            return;
        }
        if(confirm("Для работы \"" + taskName + "\" отведено " + taskTime + " минут\nВаш вариант " + option + "\n" + "Вы готовы начать?")){
            $.post("/php/taskspanel.php", {
                getQuestions : taskId,
                option : option
            }, function(req){
                //alert(req);
                $("#section-left").empty();
                if (req != "") {
                    var json = $.parseJSON(req);
                    myAppendTo("<p>" + taskName + "</p>","#section-left");
                    for (var i = 0; i < json.length; i++) {
                        myAppendTo("<p>" + (i+1) + ")вопрос - " + json[i].question_text + "</p>","#section-left");
                        myAppendTo("<textarea class='answer-textarea'>", "#section-left")
                    }
                }
            });
        } else {
            alert("not ready")
        }
    });
});