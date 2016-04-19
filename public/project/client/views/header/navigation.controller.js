(function () {
    'use strict';

    angular
        .module('FlairdropApp')
        .controller('NavigationController', NavigationController);

    function NavigationController(UserService, $location) {
        var model = this;

        model.logout = logout;
        model.isAdmin = UserService.isAdmin;
        model.isRecruiter = UserService.isRecruiter;
        model.isLoggedIn = UserService.isLoggedIn;
        model.isActive = isActive;
        model.user = UserService.getCurrentUser;

        // function init() {
        //     // model.user = UserService.getCurrentUser();
        //     // console.log("MODEL USER IN HEADER: " + model.user.username);
        //     // if (UserService.isLoggedIn()) {
        //     //     model.user = UserService.getCurrentUser();
        //     // }
        // }
        // init();

        function logout() {
            UserService.logout();
        }

        function isAdmin() {
            return UserService.isAdmin();
        }

        function isActive(loc) {
            return $location.path() === loc;
        }
    }
}());

