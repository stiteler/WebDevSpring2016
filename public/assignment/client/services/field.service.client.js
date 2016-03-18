(function () {
    'use strict';

    angular
        .module('FormBuilderApp')
        .factory('FieldService', FieldService);

    function FieldService($http) {
        var api = {
            createFieldForForm: createFieldForForm,
            getFieldsForForm: getFieldsForForm,
            getFieldForForm: getFieldForForm,
            deleteFieldFromForm, deleteFieldFromForm,
            updateField: updateField,
        };
        return api;

        function createFieldForForm(formId, field) {
            return $http({
                method: 'POST',
                url: '/api/assignment/form/' + formId + 'field',
                data: field
            });
        }

        function getFieldsForForm(formId) {
            return $http.get('/api/assignment/form/' + formId + '/field');
        }

        function getFieldForForm(formId, fieldId) {
            return $http.get('/api/assignment/form/' + formId + '/field/' + fieldId);
        }

        function deleteFieldFromForm(formId, fieldId) {
            return $http.delete('/api/assignment/form/' + formId + '/field/' + fieldId);
        }

        function updateField(formId, fieldId, field) {
            return $http({
                method: 'PUT',
                url: '/api/assignment/form/' + formId + '/field/' + fieldId,
                data: field
            });
        }

    }
}());
