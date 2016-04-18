(function () {
    'use strict';

    angular
        .module('FlairdropApp')
        .factory('EventService', EventService);

    function EventService($http) {
        var api = {
            getRecentEvents: getRecentEvents,

        };
        return api;

        function getRecentEvents() {
            return $http.get('/api/project/event');
        }

    }
}());
