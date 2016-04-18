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
            return $http({
                method: 'POST',
                url: '/api/project/user/'+userId+'/recommend',
                data: reco
            });
        }

        function deleteRecommendation(userId, recoId) {
            return $http.delete('/api/project/user/'+userId+'/recommend'+recoId);
        }

        function getRecommendsForUserId(userId) {
            return $http.get('/api/project/user/'+userId+'/recommend');
        }
    }
}());
