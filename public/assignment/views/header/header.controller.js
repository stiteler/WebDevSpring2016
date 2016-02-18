(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, UtilsService) {
        $scope.isActive = UtilsService.isActive;
    }
}());