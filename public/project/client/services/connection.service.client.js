(function () {
    'use strict';

    angular
        .module('FlairdropApp')
        .factory('ConnectionService', ConnectionService);

    function ConnectionService($http) {
        var conns = _getConnections();

        var api = {
            isConnected: isConnected,
            createConnection: createConnection,
            deleteConnection: deleteConnection,
            getConnections: getConnections,
        };
        return api;

        function isConnected(a, b) {
            $http({
                method: 'GET',
                url: '/api/project/user/'+a+'/connect'+b,
            })
            .then(function(resp) {
                return resp.data.connected;
            });
        }

        function deleteConnection(a, b) {
            return $http.delete('/api/project/user/'+a+'/connect'+b);
        }

        function createConnection(a, b) {
            return $http.post('/api/project/user/'+a+'/connect'+b);
        }

        function getConnections(userId) {
            return $http.get('/api/project/user/'+userId+'/connect');
        }
    }
}());
