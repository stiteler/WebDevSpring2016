(function () {
    'use strict';

    angular
        .module('FlairdropApp')
        .controller('ProfileController', ProfileController);

    function ProfileController($sce, $rootScope, $routeParams, $location, ImageService, ConnectionService, RecommendService, UserService, EmbedlyService) {
        var model = this;
        model.resize = ImageService.resize;
        var rs = RecommendService;

        model.getRecosForFlair = getRecosForFlair;
        model.connect = connect;
        model.removeConnection = removeConnection;
        model.isSelf = isSelf;
        model.visitRecommender = visitRecommender;
        model.renderProfileImage = renderProfileImage;
        model.connected = false;
        model.recommend = recommend;


        function init() {
            // if routeParams indicate a certain username:
            var username = $routeParams.username;
            if(username) {
                UserService
                .findUserByUsername(username)
                .then(function(resp) {
                    model.profile = resp.data;
                    testConnected();
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

            if(!current) {
                return false;
            }
            
            if(!model.profile) {
                return false;
            }
            if (current && model.profile._id == current._id) {
                return true;
            } else {
                return false;
            }                   
        }

        function renderProfileImage() {
            return model.imageUrl;
        }

        function testConnected() {
            var uid = UserService.getCurrentUser()._id;
            var pid = model.profile._id;

            if(pid == uid) {
                // looking at own profile: 
                return false;
            }

            ConnectionService
                .isConnected(uid, pid)
                .then(function(response) {
                    model.connected = response.data.connected;
                });

            console.log("Is Connected?");
            console.log(model.connected);
        }

        // just as a PoC this needs to use the ConnectionService
        function connect() {
            var uid = UserService.getCurrentUser()._id;
            var pid = model.profile._id;

            ConnectionService
                .createConnection(uid, pid)
                .then(function(resp) {
                    console.log("CONNECT OK");
                    model.connected = true;
                    _updateModels();
                }, function(err) {
                    model.errorMessage = err.data;
                    console.log("Unable to connect");
                });

        }

        function removeConnection() {
            var uid = UserService.getCurrentUser()._id;
            var pid = model.profile._id;

            ConnectionService
                .deleteConnection(uid, pid)
                .then(function(resp) {
                    console.log("DISCONNECT OK");
                    model.connected = false;
                    _updateModels();
                }, function(err) {
                    model.errorMessage = err.data;
                    console.log("Unable to connect");
                });
        }

        function recommend(reco) {
            var user = UserService.getCurrentUser();
            var pid = model.profile._id;

            var newReco = {
                recommenderId: user._id,
                recommendation: reco,
                recommenderUsername: user.username,
            };

            if(model.hasOwnProperty(reco)) {
                model.reco.push(newReco);
            } else {
                model.reco = [newReco];
            }
            

            RecommendService
                .createRecommend(pid, newReco)
                .then(function(success) {
                    console.log("RECOMEND OK.");
                    _updateModels();
                });
            _updateModels();
        }

        // function removeRecommend(reco) {
        //     var uid = UserService.getCurrentUser()._id;

        //     RecommendService
        //         .deleteRecommendation(userId, recoId)
        // }
        // }

        function visitRecommender(reco) {
            console.log("IN VISIT RECO:");
            console.log(reco);

            if(reco.link) {
                $location.path("/profile/"+reco.link);
            }
        }

        function getRecosForFlair(flair) {
            if(model.recos && model.recos.hasOwnProperty(flair)) {
                return model.recos[flair];
            } else {
                return [];
            }
            // var these = [];
            // for (var i in model.recos) {
            //     if(model.recos[i]) {
            //         var obj = model.recos[i];
            //         if(model.recos[i].recommendation == flair) {
            //             these.push(obj);
            //         }
            //     }
            // }
            // return these;
            // return _renderRecos(these);
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
