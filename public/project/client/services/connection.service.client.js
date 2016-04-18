(function () {
    'use strict';

    angular
        .module('FlairdropApp')
        .factory('ConnectionService', ConnectionService);

    function ConnectionService($http) {
        var api = {
            isConnected: isConnected,
            createConnection: createConnection,
            deleteConnection: deleteConnection,
            getConnections: getConnections,
        };
        return api;

        function isConnected(a, b) {
            return $http({
                method: 'GET',
                url: '/api/project/user/'+a+'/connect/'+b,
            });
        }

        function deleteConnection(a, b) {
            return $http.delete('/api/project/user/'+a+'/connect/'+b);
        }

        function createConnection(a, b) {
            return $http.post('/api/project/user/'+a+'/connect/'+b);
        }

        function getConnections(userId) {
            // gets all connections for currently logged in user.
            return $http.get('/api/project/connect');
        }
    }
}());
