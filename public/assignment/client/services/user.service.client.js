(function () {
    'use strict';

    angular
        .module('FormBuilderApp')
        .factory('UserService', UserService);

    function UserService($http, $rootScope) {
        var api = {
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            getUserByUserId: getUserByUserId,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            logout: logout,
        };
        return api;

        function logout() {
            $http({
                method: 'POST',
                url: '/api/assignment/logout'
            })
            .then(function(ok) {
                console.log("LOGOUT OK");
                $rootScope.user = null;
            }, function(bad) {
                console.log("Unable to logout.");
                console.log(bad);
            })
        }

        function setCurrentUser(user) {
            $rootScope.user = user;
        }

        function getCurrentUser() {
            return $http({
                method: 'GET',
                url: '/api/assignment/loggedin',
            });
        }

        function findUserByUsername(username) {
            return $http({
                method: 'GET',
                url: '/api/assignment/user',
                params: {
                    'username': username
                }
            });
        }

        function findUserByCredentials(username, password) {
            // return $http.get(
            //             '/api/assignment/user',
            //             {
            //                 params: {
            //                     'username': username, 'password': password
            //                 }
            //             });
            return $http({
                method: 'POST',
                url: '/api/assignment/login',
                data: {username: username, password: password}
            });
        }

        function findAllUsers() {
            return $http.get('/api/assignment/user');
        }

        function getUserByUserId(userId) {
            return $http.get('/api/assignment/user/' + userId);
        }

        function createUser(user) {
            return $http({
                method: 'POST',
                url: '/api/assignment/register',
                data: user
            });
        }

        function deleteUserById(userId) {
            return $http.delete('/api/assignment/user/' + userId);
        }

        function updateUser(userId, user) {
            return $http({
                method: 'PUT',
                url: '/api/assignment/user/' + userId,
                data: user
            });
        }
    }
}());
