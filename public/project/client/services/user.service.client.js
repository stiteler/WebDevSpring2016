(function () {
    'use strict';

    angular
        .module('FlairdropApp')
        .factory('UserService', UserService);

    function UserService($rootScope, $http, $location) {
        var users = findAllUsers();

        var api = {
            login: login,
            logout: logout,
            register: register,
            // findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            // createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            getUserByUserId: getUserByUserId,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            isLoggedIn: isLoggedIn,
            findUserByUsername: findUserByUsername,
        };
        return api;

        function isLoggedInAdmin() {
            if (isLoggedIn()) {
                return true;
                // return ($rootScope.user.roles.indexOf('admin') > -1) ? true : false;
            }
        }

        function isLoggedIn() {
            return $rootScope.user ? true : false;
        }

        function setCurrentUser(user) {
            $rootScope.user = user;
        }

        function getCurrentUser() {
            return $rootScope.user;
        }

        function getUserSession() {
            return $http({
                method: 'GET',
                url: '/api/project/loggedin',
            });
        }

        function login(username, password) {
            return $http({
                url: '/api/project/login',
                method: "POST",
                data: {'username': username, 'password': password}
             });
        }

        function logout() {
            $http({
                method: 'POST',
                url: '/api/project/logout'
            })
            .then(function(ok) {
                console.log("LOGOUT OK");
                $rootScope.user = null;
                $location.path("/home");
            }, function(bad) {
                console.log("Unable to logout.");
                console.log(bad);
            });
        }

        function findUserByUsername(username) {
            return $http({
                method: 'GET',
                url: '/api/project/user',
                params: {
                    'username': username
                }
            });
        }

        // function findUserByCredentials(username, password) {
        //     return $http({
        //         url: '/api/project/user',
        //         method: "GET",
        //         params: {'username': username, 'password': password}
        //      });
        // }

        function findAllUsers() {
            return $http.get('/api/project/user');
        }

        function getUserByUserId(userId) {
            return $http.get('/api/project/user/' + userId);
        }

        // decprecated with register
        function createUser(user) {
            return $http({
                method: 'POST',
                url: '/api/project/user',
                data: user
            });
        }

        function register(user) {
            return $http({
                method: 'POST',
                url: '/api/project/register',
                data: user
            });
        }

        function deleteUserById(userId) {
            return $http.delete('/api/project/user/' + userId);
        }

        function updateUser(userId, user) {
            return $http({
                method: 'PUT',
                url: '/api/project/user/' + userId,
                data: user
            });
        }
    }
}());
