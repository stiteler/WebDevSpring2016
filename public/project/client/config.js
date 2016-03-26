(function () {
    'use strict';

    angular
        .module('FlairdropApp')
        .config(function ($routeProvider) {  
            $routeProvider
                .when('/home', {
                    templateUrl: 'views/home/home.view.html'
                })
                .when('/admin', {
                    templateUrl: 'views/admin/admin.view.html',
                    controller: 'AdminController',
                    controllerAs: 'model',
                    resolve : {
                      checkLoggedIn: checkLoggedIn
                    }
                })
                .when('/profile', {
                    templateUrl: 'views/users/profile.view.html',
                    controller: 'ProfileController',
                    controllerAs: 'model',
                    resolve : {
                      checkLoggedIn: checkLoggedIn
                    }
                })
                .when('/profile/edit', {
                    templateUrl: 'views/users/profileEdit.view.html',
                    controller: 'ProfileEditController',
                    controllerAs: 'model',
                    resolve : {
                      checkLoggedIn: checkLoggedIn
                    }
                })
                .when('/profile/:username', {
                    templateUrl: 'views/users/profile.view.html',
                    controller: 'ProfileController',
                    controllerAs: 'model',
                    resolve : {
                      checkLoggedIn: checkLoggedIn
                    }
                })
                .when('/login', {
                    templateUrl: 'views/users/login.view.html',
                    controller: 'LoginController',
                    controllerAs: 'model',
                })
                .when('/register', {
                    templateUrl: 'views/users/register.view.html',
                    controller: 'RegisterController',
                    controllerAs: 'model',
                })
                .when('/search', {
                    templateUrl: 'views/search/search.view.html',
                    controller: 'SearchController',
                    controllerAs: 'model',
                    resolve : {
                      checkLoggedIn: checkLoggedIn
                    }
                })
            .otherwise({
              redirectTo: '/home'
            });

    //configure bootstrap material
    $(function() {
        $.material.init();
    });

    function checkLoggedIn(UserService, $q, $location) {

        var deferred = $q.defer();
        var result = UserService
            .isLoggedIn();
        if (result) {
            deferred.resolve();
        } else {
            deferred.reject();
            $location.url("/home");
        }

        // will turn this one once we get passport js going
        // UserService
        //     .getCurrentUser()
        //     .then(function(response) {
        //         var currentUser = response.data;
        //         if(currentUser) {
        //             UserService.setCurrentUser(currentUser);
        //             deferred.resolve();
        //         } else {
        //             deferred.reject();
        //             $location.url("/home");
        //         }
        //     });

        return deferred.promise;
    }

    });
})();
