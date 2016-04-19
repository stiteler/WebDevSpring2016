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

        // server side:
        // function getEmbedByMediaUrl(media) {
        //     return $http({
        //         method: 'GET',
        //         url: '/api/project/embed/' + encodeURIComponent(media)
        //     });
        // }

        function getEmbedByMediaUrl(media) {
            // this will all eventuall be a client side call, but for proof of concept:
            var apiUrl = 'https://api.embed.ly/1/oembed';
            return $http({
                method: 'GET',
                url: apiUrl,
                params: {
                    // temp key till server side bugs fixed.
                    'key': 'b4bc120bd8b04edf80277f14d8aa62a5',
                    'url': media
                }
            });
        }


    }
}());
