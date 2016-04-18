(function () {
    'use strict';

    angular
        .module('FlairdropApp')
        .controller('ProfileController', ProfileController);

    function ProfileController($sce, $rootScope, $routeParams, $location, ConnectionService, RecommendService, UserService, EmbedlyService) {
        var model = this;
        var rs = RecommendService;

        model.getRecosForFlair = getRecosForFlair;
        model.connect = connect;
        model.isSelf = isSelf;
        model.visitRecommender = visitRecommender;
        model.renderProfileImage = renderProfileImage;

        function init() {
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
            var current = UserService.getCurrentUser();
            if (current && model.profile._id == current._id) {
                return true;
            } else {
                return false;
            }                   
        }

        function renderProfileImage() {
            return model.imageUrl;
        }

        function isConnected() {
            var uid = UserService.getCurrentUser()._id;
            var pid = model.profile._id;

            if(pid == uid) {
                // looking at own profile: 
                return false;
            }

            model.connected = ConnectionService
                .isConnected(uid, pid);

            console.log("Is Connected?");
            console.log(isConnected);
        }

        // just as a PoC this needs to use the ConnectionService
        function connect() {
            var uid = UserService.getCurrentUser()._id;
            var pid = model.profile._id;

            ConnectionService
                .createConnection(uid, pid)
                .then(function(resp) {
                    console.log("Connection sucessful.");
                    model.connected = true;
                    _updateModels();
                }, function(err) {
                    model.errorMessage = err.data;
                    console.log("Unable to connect");
                });

        }

        function visitRecommender(reco) {
            $location.path("/profile/"+reco.recommenderUsername);
        }

        function getRecosForFlair(flair) {
            var these = [];
            for (var i in model.recos) {
                if(model.recos[i]) {
                    var obj = model.recos[i];
                    if(model.recos[i].recommendation == flair) {
                        these.push(obj);
                    }
                }
            }
            return these;
        }

        function _updateModels() {
            RecommendService
                .getRecommendsForUserId(model.profile._id)
                .then(function(resp) {
                    console.log("Recommends for this profile:");
                    console.log(resp.data);
                    model.recos = resp.data;
                });

            // TODO
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
