(function () {
    'use strict';

    angular
      .module('FormBuilderApp')
    .config(function ($routeProvider) {
        $routeProvider
        .when('/home', {
            templateUrl: 'views/home/home.view.html'
        })
        .when('/profile', {
            templateUrl: 'views/users/profile.view.html',
            controller: 'ProfileController',
            controllerAs: 'model',
            resolve: { loggedin: checkLoggedin }
        })
        .when('/admin', {
            templateUrl: 'views/admin/admin.view.html',
            controller: 'AdminController',
            controllerAs: 'model',
            resolve: { loggedin: checkLoggedin }
        })
        .when('/forms', {
            templateUrl: 'views/forms/forms.view.html',
            controller: 'FormController',
            controllerAs: 'model',
            resolve: { loggedin: checkLoggedin }
        })
        .when('/form/:formId/fields', {
            templateUrl: 'views/forms/field.view.html',
            controller: 'FieldController',
            controllerAs: 'model',
            resolve: { loggedin: checkLoggedin }
        })
        .when('/fields', {
            templateUrl: 'views/forms/field.view.html',
            controller: 'FieldController',
            controllerAs: 'model',
            resolve: { loggedin: checkLoggedin }
        })
        .when('/login', {
            templateUrl: 'views/users/login.view.html',
            controllerAs: 'model',
            controller: 'LoginController',
        })
        .when('/register', {
            templateUrl: 'views/users/register.view.html',
            controllerAs: 'model',
            controller: 'RegisterController',
        })
        .otherwise({
            redirectTo: '/home'
        });
    });

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedin').success(function(user)
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
    };
})();
