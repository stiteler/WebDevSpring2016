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
            // this will all eventuall be a client side call, but for proof of concept:
            var apiUrl = 'https://api.embed.ly/1/oembed';

            return $http({
                method: 'GET',
                url: apiUrl,
                params: {
                    'key': 'API_KEY',
                    'url': media
                }
            });
        }
    }
}());
