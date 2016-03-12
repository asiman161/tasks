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