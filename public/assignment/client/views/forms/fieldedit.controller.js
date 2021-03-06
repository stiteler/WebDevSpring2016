(function () {
    'use strict';

    angular
        .module('FormBuilderApp')
        .controller('FieldEditController', FieldEditController);

    function FieldEditController($uibModalInstance, items) {
        var model = this;

        function init() {
            model.field = items[0];
            model.prettyType = items[1];

            if (['OPTIONS', 'CHECKBOXES', 'RADIOS'].indexOf(model.field.type) >= 0) {
                model.hasOptions = true;
                model.rendered = optionsToString(model.field.options);
            }
        }
        init();

        model.ok = function () {
            if (model.hasOptions) {
                console.log('new rendered');
                console.log(model.rendered);
                model.field.options = stringToOptions(model.rendered);
                console.log('new options');
                console.log(model.field.options);
            }
            $uibModalInstance.close(model.field);
        };

        model.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        function optionsToString(options) {
            var rendered = [];
            for (var i in options) {
                if (options[i]) {
                    var option = options[i];
                    rendered.push(optionToString(option));
                }
            }
            return rendered.join('\n');
        }

        function optionToString(option) {
            return option.label + ':' + option.value;
        }

        function stringToOptions(rendered) {
            var splits = model.rendered.split('\n');
            var newOptions = [];
            for (var i in splits) {
                if (splits[i]) {
                    var split = splits[i];
                    var pair = split.split(':', 2);
                    var label = pair[0];
                    var value = pair[1];
                    newOptions.push({'label': label, 'value': value});
                }
            }
            return newOptions;
        }

    }
})();
