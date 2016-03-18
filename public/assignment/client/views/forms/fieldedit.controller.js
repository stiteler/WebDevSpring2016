(function () {
    'use strict';

    angular
        .module('FormBuilderApp')
        .controller('FieldEditController', FieldEditController);

    function FieldEditController($uibModalInstance, items) {
        var model = this;

        function init() {
            console.log('items are');
            console.log(items);
            model.field = items[0];
            model.prettyType = items[1];

            if(['OPTIONS', 'CHECKBOXES', 'RADIOS'].indexOf(model.field.type) >= 0) {
                model.hasOptions = true;
                model.rendered = options_to_string(model.field.options);
            }
        }
        init();

        model.ok = function () {
            if(model.hasOptions) {
                model.field.options = string_to_options(model.rendered);
                console.log('new options');
                console.log(model.field.options);
            }
            $uibModalInstance.close(model.field);
        };

        model.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        function options_to_string(options) {
            var rendered = [];
            for (var i in options) {
                if(options[i]) {
                    var option = options[i];
                    rendered.push(option_to_string(option));
                }
            }
            return rendered.join('\n');
        }

        function option_to_string(option) {
            return option.label + ":" + option.value;
        }

        function string_to_options(rendered) {
            var splits = rendered.split('\n');
            var newOptions = [];
            for (var i in splits) {
                if (splits[i]) {
                    var split = splits[i];
                    var pair = split.split(':');
                    var label = pair[0];
                    var value = pair[0];
                    newOptions.push({'label': label, 'value': value});
                }
            }
            return newOptions;
        }

    }
})();
