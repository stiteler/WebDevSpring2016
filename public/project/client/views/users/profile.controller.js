(function () {
    'use strict';

    angular
        .module('FlairdropApp')
        .controller('ProfileController', ProfileController);

    function ProfileController($sce, $scope, $rootScope, RecommendService, UserService, EmbedlyService) {
        var vm = this;

        function init() {
            // vm.sessionUser = $rootScope.user;
            // just for PoC I'm setting this to be Alice.
            UserService.getUserByUserId(123, function(user) {
                vm.profile = user;
            });

            _updateMedia();
            
        }
        init();

        function _updateMedia() {
            // get the media embed for this user
            if (vm.profile.media) {
                EmbedlyService.getEmbedByMediaUrl(vm.profile.media)
                .then(function(oembed) {
                    console.log("success: api_call");
                    vm.profile.mediaIFrame = $sce.trustAsHtml(oembed.data.html);
                    console.log(vm.profile);
                },
                function() {
                    console.log("failure: api_call");
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
                UserService.getUserByUserId(new_id, function(result) {
                    console.log(result);
                    vm.profile = result;
                    _updateMedia();
                });
            }
        }
    }
}());
