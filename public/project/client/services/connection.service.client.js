(function () {
    'use strict';

    angular
        .module('FlairdropApp')
        .factory('ConnectionService', ConnectionService);

    function ConnectionService() {
        var conns = _getConnections();

        var api = {
           createConnection: createConnection,
           removeConnection: removeConnection,
        };
        return api;

        function isConnected(from, to) {
            // to be implemented later.
        }

        function removeConnectionById(cid) {
            return;
        }

        function createConnection(from, to) {
            var newConn = {
                _id: (new Date()).getTime(),
                from: from,
                to: to
            }
            conns.push(newConn);
        }

        function _getConnections() {
            // for PoC only recommendations for alice.
            // recommendations are also unique in recommender::recommendee::flair
            return [];
        }
    }
}());
