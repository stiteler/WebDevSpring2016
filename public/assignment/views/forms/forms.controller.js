(function () {
    angular
        .module('FormBuilderApp')
        .controller('FormController', FormController);

    function FormController($scope, $rootScope, FormService, UtilsService) {
        $scope.deleteForm = deleteForm;
        $scope.addForm = addForm;
        $scope.selectForm = selectForm;
        $scope.updateForm = updateForm;

        (function () {
            // on init form controller.
            FormService.findAllFormsForUser(123, function (res) {
                $scope.forms = res;
            });
        })();

        function deleteForm() {
            console.log('delete form');
        }

        function addForm() {
            console.log('add form');
        }

        function updateForm() {
            console.log('update form');
        }

        function selectForm() {
            console.log('select form');
        }
    }
}());
