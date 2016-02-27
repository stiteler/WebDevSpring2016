(function () {
    'use strict';

    angular
        .module('FormBuilderApp')
        .factory('UtilsService', UtilsService);

    function UtilsService($location) {
        var api = {
            isActive: isActive,
            navigate: navigate,
        };
        return api;

        function isActive(location) {
            return $location.path() === location;
        }

        function navigate(location) {
            $location.path(location);
        }
    }
}());
