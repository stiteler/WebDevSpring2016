(function () {
    'use strict';

    angular
        .module('FormBuilderApp')
        .controller('AdminController', AdminController);

    function AdminController(UserService, $location) {
        var model = this;

        function init() {
            UserService
                .findAllUsers()
                .then(function(resp){
                    if(resp.data) {
                        model.users = resp.data;
                    }
                });
        }
        init();

        



    }
}());
