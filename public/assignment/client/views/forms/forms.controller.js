(function () {
    'use strict';

    angular
        .module('FormBuilderApp')
        .controller('FormController', FormController);

    function FormController($scope, $rootScope, FormService, UtilsService, UserService) {
        $scope.deleteForm = deleteForm;
        $scope.addForm = addForm;
        $scope.selectForm = selectForm;
        $scope.updateForm = updateForm;

        function init() {
            if (UtilsService.isLoggedIn()) {
                $scope.user = UserService.getCurrentUser();

                var userId = $scope.user._id;
                FormService
                    .findAllFormsForUser(userId)
                    .then(function (res) {
                        if(res.data) {
                            $scope.forms = res.data;
                        }
                    });
            } else {
                UtilsService.navigate('#/home');
            }
            refreshActive();
        }
        init();

        function refreshActive() {
            $scope.active = null;
        }

        function deleteForm(formId) {
            var userId = $scope.user._id;

            FormService
                .deleteFormById(formId)
                .then(function(resp) {
                    console.log("IN DELETE BY ID");
                    console.log(resp.data);
                });

            FormService
                .findAllFormsForUser(userId)
                .then(function (forms) {
                    $scope.forms = forms.data;
                });
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

            // now update the forms in scope.
            FormService.
                .findAllFormsForUser(userId)
                .then(function (res) {
                    $scope.forms = res;
                    refreshActive();
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
            $scope.active = selected;
        }

        function updateForm() {
            // TODO I AM HERE

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
