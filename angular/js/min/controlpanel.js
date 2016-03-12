/**
 * Created by Asiman on 14.02.2016.
 */
(function () {
    'use strict';
    angular
        .module('app', ['serivce'])
        .controller('controllerRight', controllerRight);

    function controllerRight(controlPanelService) {
        var vm = this;

        vm.data = [];

        vm.data2  = [];

        vm.test = function(event){
            vm.data = controlPanelService.showAllTasks().then(function(res){
                vm.data = res;
            });
        };

        $(document).ready(function(){
            $('#show-all-tasks').trigger('click');
         });
    }
})();
/**
 * Created by Asiman on 04.03.2016.
 */
(function(){
    'use strict';

    angular
        .module('serivce', ['httpPostFix'])
        .factory('controlPanelService', controlPanelService);

    function controlPanelService($http){
        return {
            showAllTasks: function(){
                return getAllTasks();
            }
        };

        function getAllTasks(){
            return $http.post('../php/taskscontrolpanel.php', {
                alltasks: ""
            }).then(function(res){
                var i = 0;
                while (res.data[i] !== undefined){
                    res.data[i].task_name = res.data[i].task_name.substr(5);
                    i++;
                }
                return res.data;
            });


        }
    }
})();
/**
 * Created by Asiman on 04.03.2016.
 */
(function () {
    'use strict';
    angular
        .module('app')
        .directive('myDirRight', myDirRight);

    function myDirRight() {
        return {
            restrict: 'AE',
            replace: true,
            template: "<ul style='padding: 0'>" +
            "<li class='list-group-item node-treeview1 tasks-list' data-ng-repeat='data1 in ctrl_r.data track by $index' data-task-name='{{data1.task_name}}'" +
            "data-ng-click='ctrl_r.test($event)'>" +
            "{{data1.task_name}} | {{data1.task_type}} | {{data1.create_date}}" +
            "</li>" +
            "</ul>"
            /*link: function (scope, element, attrs) {
                element.bind('click', function(){
                    console.log(element);
                    console.log(attrs);
                });
            }*/
        }
    }
})();
(function () {
    'use strict';
    angular
        .module('app')
        .directive('myDirRightTwo', myDirRightTwo);

    function myDirRightTwo() {
        return {
            restrict: 'AE',
            replace: true,
            template: "<li class='list-group-item node-treeview1' style='background-color:#FCF8E3;border-bottom:1px solid #fff;' ng-if='ctrl_r.data2.length > 0' ng-repeat='data2 in ctrl_r.data2'>{{data2}}</li>"
        }
    }
})();