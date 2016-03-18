(function () {
    'use strict';

    angular
        .module('FormBuilderApp')
        .factory('FormService', FormService);

    function FormService($http) {
        var api = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
        };
        return api;

        function createFormForUser(userId, form) {
            return $http({
                method: 'POST',
                url: '/api/assignment/user/' + userId + '/form',
                data: form
            });
        }

        function findAllFormsForUser(userId) {
            return $http.get('/api/assignment/user/' + userId + '/form');
        }

        function deleteFormById(formId) {
            return $http.delete('/api/assignment/form/' + formId);
        }

        function updateFormById(formId, newForm) {
            return $http({
                method: 'PUT',
                url: '/api/assignment/form/' + formId,
                data: newForm
            });
        }
    }
}());
