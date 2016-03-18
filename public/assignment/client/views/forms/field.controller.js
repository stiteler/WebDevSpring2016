(function () {
    'use strict';

    angular
        .module('FormBuilderApp')
        .controller('FieldController', FieldController);

    function FieldController(UserService, UtilsService) {
        var model = this;

        model.selectType = selectType;
        model.addField = addField;

        function init() {
            if (UtilsService.isLoggedIn()) {
                model.user = UserService.getCurrentUser();
                model.fieldTypes = _getFieldTypes();
                model.selectedFieldType = model.fieldTypes[0];
            } else {
                UtilsService.navigate('#/home');
            }
        }
        init();

        function addField() {
            var type = model.selectedFieldType;
            console.log('adding field: ' + type);
        }

        function selectType(type) {
            model.selectedFieldType = type;
        }

        function _getFieldTypes() {
            return [
                'Single Line Text Field',
                'Multi Line Text Field',
                'Date Field',
                'Dropdown Field',
                'Checkboxes Field',
                'Radio Buttons Field'
            ];
        }
    }
}());
