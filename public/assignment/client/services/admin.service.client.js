(function () {
    'use strict';

    angular
        .module('FormBuilderApp')
        .factory('AdminService', AdminService);

    function AdminService($http) {
        var api = {
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            getUserByUserId: getUserByUserId,
        };
        return api;

        function findAllUsers() {
            return $http.get('/api/assignment/admin/user');
        }

        function getUserByUserId(userId) {
            return $http.get('/api/assignment/admin/user/' + userId);
        }

        function createUser(user) {
            return $http({
                method: 'POST',
                url: '/api/assignment/admin/user',
                data: user
            });
        }

        function deleteUserById(userId) {
            return $http.delete('/api/assignment/admin/user/' + userId);
        }

        function updateUser(userId, user) {
            return $http({
                method: 'PUT',
                url: '/api/assignment/admin/user/' + userId,
                data: user
            });
        }
    }
}());
