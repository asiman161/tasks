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