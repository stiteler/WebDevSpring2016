(function () {
    'use strict';

    angular
        .module('FlairdropApp')
        .controller('ProfileController', ProfileController);

    function ProfileController($sce, $scope, $rootScope, RecommendService, UserService, EmbedlyService) {
        var vm = this;

        function init() {
            vm.$rootScope = $rootScope;
            vm.$scope = $scope;

            // vm.sessionUser = $rootScope.user;
            // just for PoC I'm setting this to be Alice.
            UserService.getUserByUserId(123, function(user) {
                vm.profile = user;
            });

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
        init();


    }
}());
