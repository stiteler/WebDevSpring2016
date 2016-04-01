(function () {
    'use strict';

    angular
        .module('FormBuilderApp')
        .factory('UtilsService', UtilsService);

    function UtilsService($rootScope, $location) {
        var api = {
            isActive: isActive,
            navigate: navigate,
            isLoggedIn: isLoggedIn,
            isAdmin: isAdmin,
        };
        return api;

        function isLoggedIn() {
            return $rootScope.user ? true : false;
        }

        function isAdmin() {
            // not supported in assignment4, will show up later.
            return true;
            // if (isLoggedIn()) {
            //     return ($rootScope.user.roles.indexOf('admin') > -1) ? true : false;
            // }
        }

        function isActive(location) {
            return $location.path() === location;
        }

        function navigate(location) {
            $location.path(location);
        }
    }
}());
