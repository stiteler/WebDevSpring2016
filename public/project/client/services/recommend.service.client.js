(function () {
    'use strict';

    angular
        .module('FlairdropApp')
        .factory('RecommendService', RecommendService);

    function RecommendService($http) {
        var api = {
           createRecommend: createRecommend,
           deleteRecommendation: deleteRecommendation,
           getRecommendsForUserId: getRecommendsForUserId,
        };
        return api;

        function createRecommend(userId, reco) {
            if(!userId) {
                console.log("Must specify a userId to create reco.")
                return;
            }
            return $http({
                method: 'POST',
                url: '/api/project/user/'+userId+'/recommend',
                data: reco
            });
        }

        function deleteRecommendation(userId, recoId) {
            if(!userId) {
                console.log("Must specify a userId to delete reco.")
                return;
            }
            return $http.delete('/api/project/user/'+userId+'/recommend'+recoId);
        }


        function getRecommendsForUserId(userId) {
            if(!userId) {
                console.log("Must specify a userId to get recos.")
                return;
            }
            return $http.get('/api/project/user/'+userId+'/recommend');
        }
    }
}());
