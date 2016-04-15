(function () {
    'use strict';

    angular
        .module('FormBuilderApp')
        .controller('FormController', FormController);

    function FormController($scope, FormService, UtilsService, UserService) {
        var model = this;

        model.deleteForm = deleteForm;
        model.addForm = addForm;
        model.selectForm = selectForm;
        model.updateForm = updateForm;

        var initialActive = {
            title: ''
        };

        function init() {
            if (UtilsService.isLoggedIn()) {
                model.user = UserService.getCurrentUser();
                refreshForms();
            } else {
                UtilsService.navigate('#/home');
            }
            refreshActive();
        }
        init();

        function refreshActive() {
            model.isSelected = false;
            model.active = angular.copy(initialActive);
        }

        function deleteForm(formId) {
            var userId = model.user._id;

            // catch an error here someday.
            FormService
                .deleteFormById(formId);

            refreshForms();
        }

        function addForm() {
            console.log("Adding new form.")
            var newForm = {
                title: model.active.title,
                fields: [],
            };

            var userId = model.user._id;

            FormService
                .createFormForUser(userId, newForm)
                .then(function(res) {
            });

            refreshForms();
            refreshActive();
        }

        function updateForm() {
            var active = model.active;
            var formId = active._id;
            var userId = model.user._id;

            // error handle this someday
            FormService
                .updateFormById(formId, active);

            refreshForms();
            refreshActive();
        }

        function refreshForms() {
            var userId = model.user._id;
            FormService
                .findAllFormsForUser(userId)
                .then(function (forms) {
                    model.forms = forms.data;
                });

        }

        function selectForm(formId) {
            // I don't need to do this.. just pass in the object right?
            // TODO Refactor
            var selected = model.active;

            for (var i in model.forms) {
                if (model.forms[i]) {
                    var form = model.forms[i];
                    if (form._id === formId) {
                        selected = form;
                    }
                }
            }
            model.isSelected = true;
            model.active = selected;
        }

    }
}());
