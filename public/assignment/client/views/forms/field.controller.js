(function () {
    'use strict';

    angular
        .module('FormBuilderApp')
        .directive('jgaSortable', function() {
            // directive ported from github.com/jannunzi/WebDev
            //      /public/experiments/directives/sortable
            //      /directive/Sortable.js

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
                        var fields = scope.model.fields;
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

    function FieldController(UserService, UtilsService, $uibModal, $routeParams, FieldService) {
        var model = this;

        model.selectType = selectType;
        model.addField = addField;
        model.removeField = removeField;
        model.editField = editField;
        model.copyField = copyField;

        function init() {
            if (UtilsService.isLoggedIn()) {
                model.user = UserService.getCurrentUser();
                model.formId = $routeParams.formId;
                //model.userId = $routeParams.userId;

                // model.form = _getTestForm();
                // model.fields = model.form.fields;

                model.fieldTypes = _getFieldTypes();
                model.selectedFieldType = model.fieldTypes[0];

                _refreshFields();

            } else {
                UtilsService.navigate('#/home');
            }
        }
        init();

        function _refreshFields() {
            FieldService
                .getFieldsForForm(model.formId)
                .then(function(resp) {
                    if (resp.data) {
                        model.fields = resp.data;
                    }
                });
        }

        function editField(field) {
            model.selectedField = field;

            var mappings = _fieldMappings();
            var inverseMappings = invert(mappings);
            var prettyType = inverseMappings[model.selectedField.type];

            var modalInstance = $uibModal.open({
                animation: false,
                templateUrl: 'views/forms/fieldedit.view.html',
                controller: 'FieldEditController',
                controllerAs: 'model',
                size: 'md',
                resolve: {
                    items: function () {
                        return [model.selectedField, prettyType];
                    }
                }
            });

            modalInstance
                .result
                .then(function (result) {
                    FieldService
                        .updateField(model.formId, model.selectedField._id, result)
                        .then(function(resp) {
                            console.log('UPDATE FIELD OK');
                        });
                    _refreshFields();
                }, function () {
                    console.log('MODAL DISMISSED');
                });
        }

        function removeField(field) {
            FieldService
                .deleteFieldFromForm(model.formId, field._id)
                .then(function(resp) {
                    if (resp.data) {
                        console.log('DELETE OK');
                    }
                });
            _refreshFields();
        }

        function addField() {
            var type = model.selectedFieldType;
            var rawType = _lookupRawType(type);
            var templates = _templateMappings();
            if (templates[rawType]) {
                var newForm = templates[rawType];

                FieldService
                    .createFieldForForm(model.formId, newForm)
                    .then(function(resp) {
                        console.log('ADD FIELD OK');
                        _refreshFields();
                    });
            }
        }

        function copyField(field) {
            var copy = angular.copy(field);
            copy._id = null;

            FieldService
                .createFieldForForm(model.formId, copy)
                .then(function(resp) {
                    console.log('COPY FIELD OK');
                });
            _refreshFields();
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
                'Email Text Field',
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
                'Email Text Field': 'EMAIL',
                'Multi Line Text Field': 'TEXTAREA',
                'Date Field': 'DATE',
                'Dropdown Field': 'OPTIONS',
                'Checkboxes Field': 'CHECKBOXES',
                'Radio Buttons Field': 'RADIOS'
            };
        }

        function _templateMappings() {
            var mappings = {
                'TEXT': {'_id': null, 'label': 'New Text Field', 'type': 'TEXT', 'placeholder': 'New Field'},
                'EMAIL': {'_id': null, 'label': 'New Email Field', 'type': 'EMAIL', 'placeholder': 'Email'},
                'TEXTAREA': {'_id': null, 'label': 'New Text Field', 'type': 'TEXTAREA', 'placeholder': 'New Field'},
                'DATE': {'_id': null, 'label': 'New Date Field', 'type': 'DATE'},
                'OPTIONS': {'_id': null, 'label': 'New Dropdown', 'type': 'OPTIONS', 'options': [
                                {'label': 'Option 1', 'value': 'OPTION_1'},
                                {'label': 'Option 2', 'value': 'OPTION_2'},
                                {'label': 'Option 3', 'value': 'OPTION_3'}
                            ]},
                'CHECKBOXES': {'_id': null, 'label': 'New Checkboxes', 'type': 'CHECKBOXES', 'options': [
                                {'label': 'Option A', 'value': 'OPTION_A'},
                                {'label': 'Option B', 'value': 'OPTION_B'},
                                {'label': 'Option C', 'value': 'OPTION_C'}
                            ]},
                'RADIOS': {'_id': null, 'label': 'New Radio Buttons', 'type': 'RADIOS', 'options': [
                                {'label': 'Option X', 'value': 'OPTION_X'},
                                {'label': 'Option Y', 'value': 'OPTION_Y'},
                                {'label': 'Option Z', 'value': 'OPTION_Z'}
                            ]}
            };
            return mappings;
        }

        function _getTestForm() {
            return {
                '_id': '010',
                'title': 'ToDo',
                'userId': 234,
                'fields':[
                 {
                     '_id':'777',
                     'label':'Title',
                     'type':'TEXT',
                     'placeholder':'Title'
                 },
                 {
                     '_id':'888',
                     'label':'Description',
                     'type':'TEXTAREA',
                     'placeholder':'Title'
                 },
                 {
                     '_id':'999',
                     'label':'Due Date',
                     'type':'DATE'
                 },
                 {
                     '_id':'145',
                     'label':'State',
                     'type':'OPTIONS',
                     'options':[
                       {
                           'label':'Massachussetts',
                           'value':'MA'
                       },
                       {
                           'label':'New Hampshire',
                           'value':'NH'
                       }
                    ]
                 },
                 {
                     '_id':'444',
                     'label':'Sex/Gender',
                     'type':'RADIOS',
                     'options':[
                       {
                           'label':'Male',
                           'value':'Male'
                       },
                       {
                           'label':'Female',
                           'value':'Female'
                       }
                    ]
                 },
                 {
                     '_id':'345',
                     'label':'Moods',
                     'type':'CHECKBOXES',
                     'options':[
                       {
                           'label':'Happy',
                           'value':'happy'
                       },
                       {
                           'label':'Accomplished',
                           'value':'accomplished'
                       }
                    ]
                 }
              ]
            };
        }
    }

    function invert(obj) {
        var newObj = {};

        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                newObj[obj[prop]] = prop;
            }
        }

        return newObj;
    }

}());

