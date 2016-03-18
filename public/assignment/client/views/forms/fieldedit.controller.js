(function () {
    'use strict';

    angular
        .module('FormBuilderApp')
        .controller('FieldEditController', FieldEditController);

    function FieldEditController($uibModalInstance, items) {
        var model = this;

        model.items = items;

        model.selected = {
            item: model.items[0]
        };

        model.ok = function () {
            $uibModalInstance.close(model.selected.item);
        };

        model.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
