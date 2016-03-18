(function () {
    'use strict';

    angular
        .module('FormBuilderApp')
        .controller('FormController', FormController);

    function FormController($scope, FormService, UtilsService, UserService) {
        $scope.deleteForm = deleteForm;
        $scope.addForm = addForm;
        $scope.selectForm = selectForm;
        $scope.updateForm = updateForm;

        var initialActive = {
            title: ''
        }

        function init() {
            if (UtilsService.isLoggedIn()) {
                $scope.user = UserService.getCurrentUser();
                refreshForms();
            } else {
                UtilsService.navigate('#/home');
            }
            refreshActive();
        }
        init();

        function refreshActive() {
            $scope.isSelected = false;
            $scope.active = angular.copy(initialActive);
        }

        function deleteForm(formId) {
            var userId = $scope.user._id;

            // catch an error here someday.
            FormService
                .deleteFormById(formId)

            refreshForms();
        }

        function addForm() {
            var newForm = {
                //TODO: add fields here?
                title: $scope.active.title,
                // _id: (new Date()).getTime(),
            };

            var userId = $scope.user._id;

            FormService
                .createFormForUser(userId, newForm)
                .then(function(res) {
            });

            refreshForms();
            refreshActive();
        }

        function updateForm() {
            var active = $scope.active;
            var formId = active._id;
            var userId = $scope.user._id;

            // error handle this someday
            FormService
                .updateFormById(formId, active);

            refreshForms();
            refreshActive();
        }

        function refreshForms() {
            var userId = $scope.user._id;
            FormService
                .findAllFormsForUser(userId)
                .then(function (forms) {
                    console.log(forms.data);
                    $scope.forms = forms.data;
                });

        }

        function selectForm(formId) {
            // I don't need to do this.. just pass in the object right?
            // TODO Refactor
            var selected = $scope.active;

            for (var i in $scope.forms) {
                if ($scope.forms[i]) {
                    var form = $scope.forms[i];
                    if (form._id === formId) {
                        selected = form;
                    }
                }
            }
            $scope.isSelected = true;
            $scope.active = selected;
        }

    }
}());
