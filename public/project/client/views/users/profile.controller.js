(function () {
    'use strict';

    angular
        .module('FlairdropApp')
        .controller('ProfileController', ProfileController);

    function ProfileController($sce, $scope, $rootScope, RecommendService, UserService, EmbedlyService) {
        var vm = this;
        var us = UserService;
        var rs = RecommendService;

        vm.getRecosForFlair = getRecosForFlair;
        vm.connect = connect;

        function init() {
            // vm.sessionUser = $rootScope.user;
            // just for PoC I'm setting this to be Alice.
            us.getUserByUserId(123, function(user) {
                vm.profile = user;
            });
            _updateModels();
        }
        init();

        // just as a PoC this needs to use the ConnectionService
        function connect() {
            $rootScope.connected = true;
            _updateModels();
        }

        function getRecosForFlair(flair) {
            var these = [];
            for (var i in vm.recos) {
                if(vm.recos[i]) {
                    var obj = vm.recos[i];
                    if(vm.recos[i].flair == flair) {
                        these.push(obj);
                    }
                }
            }
            return these;
        }

        function _updateModels() {
            rs.getRecommendsForUser(vm.profile.username, function(recos) {
                console.log(recos);
                vm.recos = recos;
            })
            vm.connected = $rootScope.connected ? true : false;

            _updateMedia();
        }

        function _updateMedia() {
            // get the media embed for this user
            if (vm.profile.media) {
                EmbedlyService.getEmbedByMediaUrl(vm.profile.media)
                .then(function(oembed) {
                    // console.log("success: api_call");
                    vm.profile.mediaIFrame = $sce.trustAsHtml(oembed.data.html);
                },
                function() {
                    // console.log("failure: api_call");
                    vm.profile.mediaIFrame = null;
                });
            }
        }

        // this is just for the PoC for now.
        vm.changeUserByUsername = changeUserByUsername;

        function changeUserByUsername(username) {
            // this is hardcoded because it's just for the API proof of concept
            var user_map = {
                'alice': 123,
                'bob': 125,
                'don': 124,
            };

            var new_id = user_map[username];
            console.log('new id: ' + new_id)
            if (new_id) {
                us.getUserByUserId(new_id, function(result) {
                    console.log(result);
                    vm.profile = result;
                    _updateMedia();
                });
            }
        }
    }
}());
