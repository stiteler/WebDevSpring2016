(function () {
    'use strict';

    angular
        .module('FlairdropApp')
        .factory('RecommendService', RecommendService);

    function RecommendService() {
        var recos = _getRecommends();

        var api = {
           createRecommend: createRecommend,
           deleteRecommendation: deleteRecommendation,
           getRecommendsForUser: getRecommendsForUser,
        };
        return api;


        function createRecommend(reco, callback) {
            var rid = (new Date()).getTime();
            reco._id = rid;
            recos.push(reco);
            callback(reco);
        }

        function updateRecommend() {
            // not going to expose this in the API
            // just yet, update isn't really a supported
            // operation for recommends since they're
            // binary (yes recommend, or no don't)
            // for a given recommender/recommendee/flair
            // combination -> the update is 2 clicks.
            return;
        }

        function deleteRecommendation(reco, callback) {
            // deletes a recommendation 
            var rid = reco._id;
            deleteRecommendById(rid, callback);
        }

        function deleteRecommendById(recoId, callback) {
            var reco = _getRecommendById(recoId);
            if (reco) {
                var index = recos.indexOf(user);
                recos.splice(index, 1);
                callback(recos);
            }
        }

        function deleteRecommendationById(del_id, callback) {
            // removes the selected recommendation
            for (var i in recos) {
                if (recos[i]) {
                    var r = recos[i];
                    if (r._id === del_id) {
                        userRecos.push(r);
                    }

                }
            }
            callback(userRecos);
        }

        function getRecommendsForUser(username, callback) {
            var userRecos = [];
            for (var i in recos) {
                if (recos[i]) {
                    var r = recos[i];
                    if (r.recommendee === username) {
                        userRecos.push(r);
                    }

                }
            }
            callback(userRecos);
        }

        function _getRecommendById(rid, callback) {
            for (var i in recos) {
                if (recos[i]) {
                    var r = recos[i];
                    if (r._id === rid) {
                        return r;
                    }
                }
            }
            return null;
        }

        function findRecommend(recommendee, recommender, flair, callback) {
            var recos = _getRecommends();
            for (var i in recos) {
                if (recos[i]) {
                    var r = recos[i];

                    test = {
                        recommender: recommender,
                        recommendee: recommendee,
                        flair: flair,
                    }

                    if (_equals(test, r)) {
                        callback(r);
                    }
                }
            }
            callback(null);
        }

        function _equals(a, b) {
            if (a.recommendee !== b.recommendee) {
                return false;
            }
            if (a.recommender !== b.recommender) {
                return false;
            }
            if(a.flair != b.flair) {
                return false;
            }
            return true;
        }

        function _getRecommends() {
            // for PoC only recommendations for alice.
            // recommendations are also unique in recommender::recommendee::flair
            return [
                {
                    _id: 123,
                    recommendee: 'alice',
                    recommender: 'don',
                    flair: 'magic',
                    blurb: 'Alice\'s magic skills are out of this world',
                },
                {
                    _id: 124,
                    recommendee: 'alice',
                    recommender: 'don',
                    flair: 'riddles',
                    blurb: 'Alice always stumps me!',
                },
                {
                    _id: 126,
                    recommendee: 'alice',
                    recommender: 'bob',
                    flair: 'magic',
                    blurb: 'bravo',
                },
                {
                    _id: 127,
                    recommendee: 'alice',
                    recommender: 'bob',
                    flair: 'walking',
                    blurb: 'Alice\'s magic skills are out of this world',
                }
            ];
        }
    }
}());
