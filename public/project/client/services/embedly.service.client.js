(function () {
    'use strict';

    angular
        .module('FlairdropApp')
        .factory('EmbedlyService', EmbedlyService);

    function EmbedlyService($http) {
        var api = {
            getEmbedByMediaUrl: getEmbedByMediaUrl,
        };
        return api;

        function getEmbedByMediaUrl(media) {
            return $http({
                method: 'GET',
                url: '/api/project/embed/' + encodeURIComponent(media)
            });
        }
    }
}());
