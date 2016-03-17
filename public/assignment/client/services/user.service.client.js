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
        };
        return api;

        function setCurrentUser(user) {
            $rootScope.user = user;
        }

        function getCurrentUser() {
            return $rootScope.user;
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
            return $http.get(
                        '/api/assignment/user',
                        {
                            params: {
                                'username': username, 'password': password
                            }
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
                url: '/api/assignment/user',
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
