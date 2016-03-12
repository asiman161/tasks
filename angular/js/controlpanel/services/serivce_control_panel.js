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