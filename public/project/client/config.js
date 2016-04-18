(function () {
    'use strict';

    angular
        .module('FlairdropApp')
        .config(function ($routeProvider) {  
            $routeProvider
            .when('/home', {
                templateUrl: 'views/home/home.view.html',
                controller: 'HomeController',
                controllerAs: 'model',
                
            })
            .when('/admin', {
                templateUrl: 'views/admin/admin.view.html',
                controller: 'AdminController',
                controllerAs: 'model',
                resolve : {
                  loggedin: checkLoggedin
                }
            })
            .when('/profile', {
                templateUrl: 'views/users/profile.view.html',
                controller: 'ProfileController',
                controllerAs: 'model',
                resolve : {
                  loggedin: checkLoggedin
                }
            })
            .when('/profile/edit', {
                templateUrl: 'views/users/profileEdit.view.html',
                controller: 'ProfileEditController',
                controllerAs: 'model',
                resolve : {
                  loggedin: checkLoggedin
                }
            })
            .when('/profile/:username', {
                templateUrl: 'views/users/profile.view.html',
                controller: 'ProfileController',
                controllerAs: 'model',
                resolve : {
                  loggedin: checkLoggedin
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
                  loggedin: checkLoggedin
                }
            })
            .otherwise({
              redirectTo: '/home'
            });

            //configure bootstrap material
            $(function() {
                $.material.init();
            });
        });

    var checkLoggedin = function($q, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                console.log("user found");
                $rootScope.user = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                console.log("No user found");
                $rootScope.error = 'You need to log in.';
                deferred.reject();
                $location.url('/');
            }
        });

        return deferred.promise;
    }

    // function checkLoggedIn(UserService, $q, $location) {

    //     var deferred = $q.defer();
    //     var result = UserService
    //         .isLoggedIn();
    //     if (result) {
    //         deferred.resolve();
    //     } else {
    //         deferred.reject();
    //         $location.url("/home");
    //     }

    //     // will turn this one once we get passport js going
    //     // UserService
    //     //     .getCurrentUser()
    //     //     .then(function(response) {
    //     //         var currentUser = response.data;
    //     //         if(currentUser) {
    //     //             UserService.setCurrentUser(currentUser);
    //     //             deferred.resolve();
    //     //         } else {
    //     //             deferred.reject();
    //     //             $location.url("/home");
    //     //         }
    //     //     });

    //     return deferred.promise;
    // }

    // });
})();
