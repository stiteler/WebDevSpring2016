(function () {
    'use strict';

    angular
        .module('FlairdropApp')
        .controller('ConnectionController', ConnectionController);

    function ConnectionController(ConnectionService, UserService) {
        var model = this;
        model.deleteConnection = deleteConnection;
        model.errorMessage = null;
        model.clearError = clearError;

        function init() {
            model.user = UserService.getCurrentUser();
            updateConnections();
        }
        init();

        function clearError() {
            model.errorMessage = false;
        }


        function updateConnections() {
            ConnectionService
                .getConnections()
                .then(function(resp) {
                    model.connections = resp.data;
                    if(model.connections.length < 1) {
                        model.errorMessage = "You have no connections yet! Try connecting to others in the search window!"
                    }
                }, function(err) {
                    console.log("Unable to load connections");
                    model.errorMessage = "Unable to load your connections at this time!";
                });
        }

        function deleteConnection(connection) {
            ConnectionService
                .deleteConnection(connection._id, model.user._id)
                .then(function(resp) {
                    console.log("DELETE OK.");
                    updateConnections();
                }, function(err) {
                    model.errorMessage = "You have no connections!"
                    console.log("Can't delete connection");
                })
        }

    }
}());
