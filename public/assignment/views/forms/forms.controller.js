(function () {
    'use strict';

    angular
        .module('FormBuilderApp')
        .controller('FormController', FormController);

    function FormController($scope, $rootScope, FormService, UtilsService) {
        $scope.deleteForm = deleteForm;
        $scope.addForm = addForm;
        $scope.selectForm = selectForm;
        $scope.updateForm = updateForm;

        function init() {
            if (UtilsService.isLoggedIn()) {
                $scope.user = $rootScope.user;
                var userId = $scope.user._id;
                FormService.findAllFormsForUser(userId, function (res) {
                    $scope.forms = res;
                });
            } else {
                UtilsService.navigate('#/home');
            }
            refreshActive();
        }
        init();

        function refreshActive() {
            $scope.active = {
                title: '',
            };
        }

        function deleteForm(formId) {
            var userId = $scope.user._id;
            FormService.deleteFormById(formId, function(resp) {
                // vuln. in resp from delete by Id
                // user gets ALL forms, to fix would
                // require changing the API.
                FormService.findAllFormsForUser(userId, function (forms) {
                    $scope.forms = forms;
                });
            });
        }

        function addForm() {
            var newForm = {
                title: $scope.active.title,
                _id: (new Date()).getTime(),
            };
            var userId = $scope.user._id;
            FormService.createFormForUser(userId, newForm, function(res) {
                // update the forms in scope.
                FormService.findAllFormsForUser(userId, function (res) {
                    $scope.forms = res;
                    refreshActive();
                });
            });
        }

        function selectForm(formId) {
            var selected = $scope.active;
            for (var i in $scope.forms) {
                if ($scope.forms[i]) {
                    var form = $scope.forms[i];
                    if (form._id === formId) {
                        selected = form;
                    }
                }
            }
            $scope.active = selected;
        }

        function updateForm() {
            // take the 'active' form and save it,
            // then refresh all forms
            var active = $scope.active;
            var formId = active._id;
            var userId = $scope.user._id;

            FormService.updateFormById(formId, active, function (update) {
                console.log('update');
                console.log(update);
                FormService.findAllFormsForUser(userId, function (forms) {
                    $scope.forms = forms;
                    refreshActive();
                });
            });
        }
    }
}());
