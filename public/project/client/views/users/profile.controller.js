(function () {
    'use strict';

    angular
        .module('FlairdropApp')
        .controller('ProfileController', ProfileController);

    function ProfileController($sce, $routeParams, $location, RecommendService, UserService, EmbedlyService) {
        var model = this;
        var rs = RecommendService;

        model.getRecosForFlair = getRecosForFlair;
        model.connect = connect;
        model.isSelf = isSelf;

        function init() {
            // model.sessionUser = $rootScope.user;
            // just for PoC I'm setting this to be Alice.

            // if routeParams indicate a certain username:
            var username = $routeParams.username;
            if(username) {
                UserService
                .findUserByUsername(username)
                .then(function(resp) {
                    model.profile = resp.data;
                    _updateModels();

                }, function(err) {
                    $location.path('/home');
                });
            }
            else if (UserService.isLoggedIn()) {
                    model.profile = UserService.getCurrentUser();
                    _updateModels();
                } else {
                    $location.path('/home');
                }

        }
        init();
        
        function isSelf() {
            // true if this is the users profile.
            if(model.profile._id === UserService.getCurrentUser()._id) {
                return true;
            } else {
                return false;
            }
        }

        // just as a PoC this needs to use the ConnectionService
        function connect() {
            // $rootScope.connected = true;
            _updateModels();
        }

        function getRecosForFlair(flair) {
            var these = [];
            for (var i in model.recos) {
                if(model.recos[i]) {
                    var obj = model.recos[i];
                    if(model.recos[i].flair == flair) {
                        these.push(obj);
                    }
                }
            }
            return these;
        }

        function _updateModels() {
            // RecommendService
            //     .getRecommendsForUser(model.profile.username, function(recos) {
            //         console.log(recos);
            //         model.recos = recos;
            //     });
            // model.connected = $rootScope.connected ? true : false;

            _updateMedia();
        }

        function _updateMedia() {
            // get the media embed for this user
            if (model.profile.media) {
                EmbedlyService
                    .getEmbedByMediaUrl(model.profile.media)
                    .then(function(oembed) {
                        // console.log("success: api_call");
                        model.profile.mediaIFrame = $sce.trustAsHtml(oembed.data.html);
                    },
                    function() {
                        // console.log("failure: api_call");
                        model.profile.mediaIFrame = null;
                    });
            }
        }

    }
}());
