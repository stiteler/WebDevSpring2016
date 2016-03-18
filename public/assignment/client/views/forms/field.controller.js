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
                model.form = _getTestForm();
                model.fields = model.form.fields;

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

        function _fieldMappings() {
            return {
                'Single Line Text Field': 'TEXT',
                'Multi Line Text Field': 'TEXTAREA',
                'Date Field': 'DATE',
                'Dropdown Field': 'OPTIONS',
                'Checkboxes Field': 'CHECKBOXES',
                'Radio Buttons Field': 'RADIOS'
            };
        }

        function _getTestForm() {
           return {
              "_id": "010",
              "title": "ToDo",
              "userId": 234,
              "fields":[
                 {
                    "_id":"777",
                    "label":"Title",
                    "type":"TEXT",
                    "placeholder":"Title"
                 },
                 {
                    "_id":"888",
                    "label":"Description",
                    "type":"TEXTAREA",
                    "placeholder":"Title"
                 },
                 {
                    "_id":"999",
                    "label":"Due Date",
                    "type":"DATE"
                 },
                 {
                    "_id":"145",
                    "label":"State",
                    "type":"OPTIONS",
                    "options":[
                       {
                          "label":"Massachussetts",
                          "value":"MA"
                       },
                       {
                          "label":"New Hampshire",
                          "value":"NH"
                       }
                    ]
                 },
                 {
                    "_id":"444",
                    "label":"Sex/Gender",
                    "type":"RADIOS",
                    "options":[
                       {
                          "label":"Male",
                          "value":"Male"
                       },
                       {
                          "label":"Female",
                          "value":"Female"
                       }
                    ]
                 },
                 {
                    "_id":"345",
                    "label":"Moods",
                    "type":"CHECKBOXES",
                    "options":[
                       {
                          "label":"Happy",
                          "value":"happy"
                       },
                       {
                          "label":"Accomplished",
                          "value":"accomplished"
                       }
                    ]
                 }
              ]
           };
        }
    }
}());
