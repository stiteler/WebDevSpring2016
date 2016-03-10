(function () {
    'use strict';

    angular
        .module('FlairdropApp')
        .config(function ($routeProvider) {  
            $routeProvider
                .when('/home', {
                    templateUrl: 'views/home/home.view.html'
                })
                .when('/poc/users', {
                    templateUrl: 'views/admin/admin.view.html',
                    controller: 'AdminController',
                    controllerAs: 'model',
                })
                .when('/poc/profile', {
                  templateUrl: 'views/users/profile.view.html',
                  controller: 'ProfileController',
                  controllerAs: 'model',
                })
                // example of resolve:
                // see jose's code in proj/client/omdb/config.js
                //  .when("/profile", {
                //    templateUrl: "template.html",
                //    controller: "ProfileContoller",
                //    controllerAs: "model",
                //    resolve: { 
                //      checkLoggedIn: checkLoggedIn 
                //    }
                //
                //    underneath
                //    declare
                //    function checkLoggedIn(UserService) {$http.get("/api/project/loggedin");}
                // .when('/profile', {
                //     templateUrl: 'views/users/profile.view.html',
                //     controller: 'ProfileController',
                // })
                // .when('/admin', {
                //     templateUrl: 'views/admin/admin.view.html'
                // })
                // .when('/forms', {
                //     templateUrl: 'views/forms/forms.view.html',
                //     controller: 'FormController'
                // })
                // .when('/fields', {
                //     templateUrl: 'views/forms/fields.view.html',
                // })
                // .when('/login', {
                //     templateUrl: 'views/users/login.view.html',
                //     controller: 'LoginController',
                // })
                // .when('/register', {
                //     templateUrl: 'views/users/register.view.html',
                //     controller: 'RegisterController',
                // })
            .otherwise({
              redirectTo: '/home'
            });

    //configure bootstrap material
    $(function() {
        $.material.init();
    });

    });
})();
