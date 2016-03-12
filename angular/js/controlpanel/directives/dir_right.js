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