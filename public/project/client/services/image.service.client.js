(function () {
    'use strict';

    angular
        .module('FlairdropApp')
        .factory('ImageService', ImageService);

    function ImageService() {
        var api = {
            resize: resize,
        };
        return api;

        function resize(url, px) {
            // leverage embedly's display api for consistent photos.
            var base = 'http://i.embed.ly/1/display/resize?'
            var uri = 'url=' + encodeURIComponent(url);
            var action = '&grow=false&width=' + px;
            var key = '&key=b4bc120bd8b04edf80277f14d8aa62a5';
            var src = base + uri + action + key;
            return src;
        }

    }
}());
