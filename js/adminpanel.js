/**
 * Created by Asiman on 26.03.2016.
 */
$(document).ready(function () {
    function str_rand() {
        var result = '';
        var words = '0123456789qwertyuiopasdfghjklzxcvbnm';
        var max_position = words.length - 1;
        for (var i = 0; i < 5; ++i) {
            var position = Math.floor(Math.random() * max_position);
            result = result + words.substring(position, position + 1);
        }
        return result;
    }

    function update() {
        $('.option').remove();
        $.post("php/adminpanel.php", {
            getTeachers: ''
        }, function (req) {
            //alert(req);
            if(req != ''){
                var json = $.parseJSON(req);
                for (var i = 0; i < json.length; i++) {
                    $('<option class="option">' + json[i].l_name + ' ' + json[i].f_name + ' ' + json[i].father_name + '</option>').appendTo('#select-teacher-name');
                }
            }
        });

        $.post("php/adminpanel.php", {
            getGroups: ''
        }, function (req) {
            //alert(req);
            if(req != ''){
                var json = $.parseJSON(req);
                for (var i = 0; i < json.length; i++) {
                    $('<option class="option">' + json[i].group_name + '</option>').appendTo('#select-group-name');
                }
            }

        });
    }

    update();

    $(document).on('click', '#update', function(){
        update();
    });

    $(document).on('click', '#log-out', function () {
        $.post('php/adminpanel.php', {
            logout: ''
        }, function (req) {
            if (req === "true") {
                window.location.href = "/authadmin.html";
            }
        })
    });

    $(document).on('click', '#show-teacher-groups', function () {
        //alert($('#select-teacher-name').val());
        var name = $('#select-teacher-name').val().split(' ');
        $.post('php/adminpanel.php', {
            showgroups: '',
            lname: name[0],
            fname: name[1],
            fathername: name[2]
        }, function (req) {
            $('#groups').empty();
            if(req != ""){
                var json = $.parseJSON(req);
                for (var i = 0; i < json.length; i++) {
                    $('<p>' + json[i].group_name + '</p>').appendTo('#groups');
                }
            }

        })
    });

    $(document).on('submit', '#create-teacher', function () {
        var fname = $('#f-name').val();
        var lname = $('#l-name').val();
        var fathername = $('#father-name').val();
        var login = $('#teacher-login').val();
        var password = $('#teacher-password').val();
        var password2 = $('#teacher-password2').val();

        if (password != password2) {
            alert('пароли не соответсвуют друг другу');
        } else {
            $('#input-submit-create-teacher').attr('disabled', true);
            $.post('php/adminpanel.php', {
                createteacher: '',
                fname: fname,
                lname: lname,
                fathername: fathername,
                login: login,
                password: password,
                prefix: str_rand()
            }, function (req) {
                update();
                alert(req);
                $('#input-submit-create-teacher').attr('disabled', false);
            })
        }
        return false;
    });

    $(document).on('submit', '#create-group', function () {
        var groupName = $('#group-name').val();
        $('#input-submit-create-group').attr('disabled', true);
        $.post('php/adminpanel.php', {
            creategroup: '',
            groupname: groupName
        }, function(req){
            update();
            alert(req);
            $('#input-submit-create-group').attr('disabled', false);
        });
        return false;
    });

    $(document).on('click', '#btn-add-group', function(){
        var teacherName = $('#select-teacher-name').val().split(' ');
        var groupName = $('#select-group-name').val();
        $('#btn-add-group').attr('disabled', true);
        $.post('php/adminpanel.php', {
            addGroupToTeacher: '',
            lname: teacherName[0],
            fname: teacherName[1],
            fathername: teacherName[2],
            groupname: groupName
        }, function(req){
            alert(req);
            $('#btn-add-group').attr('disabled', false);
        });
    });

    $(document).on('click', '#btn-remove-teacher-group', function(){
        var teacherName = $('#select-teacher-name').val().split(' ');
        var groupName = $('#select-group-name').val();
        $('#btn-remove-teacher-group').attr('disabled', true);
        $.post('php/adminpanel.php', {
            removeGroupToTeacher: '',
            lname: teacherName[0],
            fname: teacherName[1],
            fathername: teacherName[2],
            groupname: groupName
        }, function(req){
            alert(req);
            $('#btn-remove-teacher-group').attr('disabled', false);
        });
    });

    $(document).on('click', '#btn-remove-teacher', function(){
        var teacherName = $('#select-teacher-name').val().split(' ');
        $('#btn-remove-teacher').attr('disabled', true);
        $.post('php/adminpanel.php', {
            removeTeacher: '',
            lname: teacherName[0],
            fname: teacherName[1],
            fathername: teacherName[2]
        }, function(req){
            update();
            alert(req);
            $('#btn-remove-teacher').attr('disabled', false);
        });
    });
    $(document).on('click', '#btn-remove-group', function(){
        var groupName = $('#select-group-name').val();
        $('#btn-remove-group').attr('disabled', true);
        $.post('php/adminpanel.php', {
            removeGroup: '',
            groupname: groupName
        }, function(req){
            update();
            alert(req);
            $('#btn-remove-group').attr('disabled', false);
        });
    });
});