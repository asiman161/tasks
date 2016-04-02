/**
 * Created by Asiman on 02.04.2016.
 */
$(document).ready(function(){
    function Calendar2(id, year, month) {
        var Dlast = new Date(year,month+1,0).getDate(),
            D = new Date(year,month,Dlast),
            DNlast = new Date(D.getFullYear(),D.getMonth(),Dlast).getDay(),
            DNfirst = new Date(D.getFullYear(),D.getMonth(),1).getDay(),
            calendar = '<tr>',
            month=["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
        if (DNfirst != 0) {
            for(var  i = 1; i < DNfirst; i++) calendar += '<td>';
        }else{
            for(var  i = 0; i < 6; i++) calendar += '<td>';
        }
        for(var  i = 1; i <= Dlast; i++) {
            if (i == new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()) {
                calendar += '<td class="today get-date test-t" data-value='+i+'>' + i;
            }else{
                calendar += '<td class="get-date test-t" data-value='+i+'>' + i;
            }
            if (new Date(D.getFullYear(),D.getMonth(),i).getDay() == 0) {
                calendar += '<tr>';
            }
        }
        for(var  i = DNlast; i < 7; i++) calendar += '<td>&nbsp;';
        document.querySelector('#'+id+' tbody').innerHTML = calendar;
        document.querySelector('#'+id+' thead td:nth-child(2)').innerHTML = month[D.getMonth()] +' '+ D.getFullYear();
        document.querySelector('#'+id+' thead td:nth-child(2)').dataset.month = D.getMonth();
        document.querySelector('#'+id+' thead td:nth-child(2)').dataset.year = D.getFullYear();
        if (document.querySelectorAll('#'+id+' tbody tr').length < 6) {  // чтобы при перелистывании месяцев не "подпрыгивала" вся страница, добавляется ряд пустых клеток. Итог: всегда 6 строк для цифр
            document.querySelector('#'+id+' tbody').innerHTML += '<tr><td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;';
        }
    }

    $(document).on('click', '.get-date', function(){
        //$('#show-all-tasks').trigger('click');
        //alert($(this).attr('data-value'))
        var data = $('.qwe').text().split(' ');
        var answer = [];
        if(data[0] === 'Январь'){
            answer = [$(this).attr('data-value'), 1, data[1]];
            $('#date-day').attr('value', answer[0]);
            $('#date-month').attr('value', answer[1]);
            $('#date-year').attr('value', answer[2]);
        }
        if(data[0] === 'Февраль'){
            answer = [$(this).attr('data-value'), 2, data[1]];
            $('#date-day').attr('value', answer[0]);
            $('#date-month').attr('value', answer[1]);
            $('#date-year').attr('value', answer[2]);
        }
        if(data[0] === 'Март'){
            answer = [$(this).attr('data-value'), 3, data[1]];
            $('#date-day').attr('value', answer[0]);
            $('#date-month').attr('value', answer[1]);
            $('#date-year').attr('value', answer[2]);
        }
        if(data[0] === 'Апрель'){
            answer = [$(this).attr('data-value'), 4, data[1]];
            $('#date-day').attr('value', answer[0]);
            $('#date-month').attr('value', answer[1]);
            $('#date-year').attr('value', answer[2]);
        }
        if(data[0] === 'Май'){
            answer = [$(this).attr('data-value'), 5, data[1]];
            $('#date-day').attr('value', answer[0]);
            $('#date-month').attr('value', answer[1]);
            $('#date-year').attr('value', answer[2]);
        }
        if(data[0] === 'Июнь'){
            answer = [$(this).attr('data-value'), 6, data[1]];
            $('#date-day').attr('value', answer[0]);
            $('#date-month').attr('value', answer[1]);
            $('#date-year').attr('value', answer[2]);
        }
        if(data[0] === 'Июль'){
            answer = [$(this).attr('data-value'), 7, data[1]];
            $('#date-day').attr('value', answer[0]);
            $('#date-month').attr('value', answer[1]);
            $('#date-year').attr('value', answer[2]);
        }
        if(data[0] === 'Август'){
            answer = [$(this).attr('data-value'), 8, data[1]];
            $('#date-day').attr('value', answer[0]);
            $('#date-month').attr('value', answer[1]);
            $('#date-year').attr('value', answer[2]);
        }
        if(data[0] === 'Сентябрь'){
            answer = [$(this).attr('data-value'), 9, data[1]];
            $('#date-day').attr('value', answer[0]);
            $('#date-month').attr('value', answer[1]);
            $('#date-year').attr('value', answer[2]);
        }
        if(data[0] === 'Октябрь'){
            answer = [$(this).attr('data-value'), 10, data[1]];
            $('#date-day').attr('value', answer[0]);
            $('#date-month').attr('value', answer[1]);
            $('#date-year').attr('value', answer[2]);
        }
        if(data[0] === 'Ноябрь'){
            answer = [$(this).attr('data-value'), 11, data[1]];
            $('#date-day').attr('value', answer[0]);
            $('#date-month').attr('value', answer[1]);
            $('#date-year').attr('value', answer[2]);
        }
        if(data[0] === 'Декабрь'){
            answer = [$(this).attr('data-value'), 12, data[1]];
            $('#date-day').attr('value', answer[0]);
            $('#date-month').attr('value', answer[1]);
            $('#date-year').attr('value', answer[2]);
        }
        $('#show-tasks-by-date').trigger('click');
        $('#date-day').attr('value', '');
        $('#date-month').attr('value', '');
        $('#date-year').attr('value', '');
    });

    Calendar2("calendar2", new Date().getFullYear(), new Date().getMonth());
    // переключатель минус месяц
    document.querySelector('#calendar2 thead tr:nth-child(1) td:nth-child(1)').onclick = function() {
        Calendar2("calendar2", document.querySelector('#calendar2 thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar2 thead td:nth-child(2)').dataset.month)-1);
    };
    // переключатель плюс месяц
    document.querySelector('#calendar2 thead tr:nth-child(1) td:nth-child(3)').onclick = function() {
        Calendar2("calendar2", document.querySelector('#calendar2 thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar2 thead td:nth-child(2)').dataset.month)+1);
    }
});