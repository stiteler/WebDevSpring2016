(function () {
    'use strict';

    angular
        .module('FormBuilderApp')
        .directive('jgaSortable', function() {
            // directive ported from github.com/jannunzi/WebDev
            //      /public/experiments/directives/sortable
            //      /directive/Sortable.js
            console.log('in directive');

            var start = null;
            var end = null;

            function link(scope, element, attributes) {
                var jgaAxis = attributes.jgaAxis;
                $(element).sortable({
                    axis: jgaAxis,
                    start: function(event, ui) {
                        start = ui.item.index();
                    },
                    stop: function(event, ui) {
                        end = ui.item.index();
                        var fields = scope.model.form.fields;
                        var temp = fields[start];
                        fields[start] = fields[end];
                        fields[end] = temp;
                        scope.$apply();
                    }
                });
            }

            return {
                link: link
            };
        })
        .controller('FieldController', FieldController);

    function FieldController(UserService, UtilsService) {
        var model = this;

        model.selectType = selectType;
        model.addField = addField;
        model.removeField = removeField;

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

        function removeField(field) {
            console.log('removing Field: ' + field);
        }

        function addField() {
            var type = model.selectedFieldType;
            var rawType = _lookupRawType(type);
            var templates = _templateMappings();
            if(templates[rawType]) {
                model.form.fields.push(templates[rawType]);
            }
        }

        function selectType(type) {
            model.selectedFieldType = type;
        }

        function _lookupRawType(type) {
            var mappings = _fieldMappings();
            if (mappings[type]) {
                return mappings[type];
            }
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

        function _templateMappings() {
            var mappings = {
                'TEXT': {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"},
                'TEXTAREA': {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"},
                'DATE': {"_id": null, "label": "New Date Field", "type": "DATE"},
                'OPTIONS': {"_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                                {"label": "Option 1", "value": "OPTION_1"},
                                {"label": "Option 2", "value": "OPTION_2"},
                                {"label": "Option 3", "value": "OPTION_3"}
                            ]},
                'CHECKBOXES': {"_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                                {"label": "Option A", "value": "OPTION_A"},
                                {"label": "Option B", "value": "OPTION_B"},
                                {"label": "Option C", "value": "OPTION_C"}
                            ]},
                'RADIOS': {"_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                                {"label": "Option X", "value": "OPTION_X"},
                                {"label": "Option Y", "value": "OPTION_Y"},
                                {"label": "Option Z", "value": "OPTION_Z"}
                            ]}
            }
            return mappings;
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
