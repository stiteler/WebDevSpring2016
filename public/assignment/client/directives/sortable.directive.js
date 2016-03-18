// ported from github.com/jannunzi/WebDev/public/experiments/directives/sortable/directive/Sortable.js
(function(){
    'use strict';

    angular
        .module('fieldSortable', [])
        .directive('fieldSortable', fieldSortable);

    function fieldSortable() {
        var start = null;
        var end = null;

        console.log("loaded fieldSortable");

        function link(scope, element, attributes) {
            console.log("IN LINK");
            var Axis = attributes.fieldAxis;
            $(element).sortable({
                axis: Axis,
                start: function(event, ui) {
                    start = ui.item.index();
                },
                stop: function(event, ui) {
                    end = ui.item.index();
                    var temp = scope.fields[start];
                    scope.fields[start] = scope.fields[end];
                    scope.fields[end] = temp;
                    scope.$apply();
                }
            });
        }
        return {
            link: link
        };
    }
})();
