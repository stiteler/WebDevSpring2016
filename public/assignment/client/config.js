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
        })
        .when('/admin', {
            templateUrl: 'views/admin/admin.view.html',
            controller: 'AdminController',
            controllerAs: 'model',
        })
        .when('/forms', {
            templateUrl: 'views/forms/forms.view.html',
            controller: 'FormController'
        })
        .when('/form/:formId/fields', {
            templateUrl: 'views/forms/field.view.html',
            controller: 'FieldController',
            controllerAs: 'model',
        })
        .when('/fields', {
            templateUrl: 'views/forms/field.view.html',
            controller: 'FieldController',
            controllerAs: 'model',
        })
        .when('/login', {
            templateUrl: 'views/users/login.view.html',
            controller: 'LoginController',
        })
        .when('/register', {
            templateUrl: 'views/users/register.view.html',
            controller: 'RegisterController',
        })
        .otherwise({
            redirectTo: '/home'
        });
    });
})();
