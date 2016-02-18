(function(){
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($scope, $location) {
        $scope.isActive = function (loc) {
            return loc == $location.path();
        }
    }
}());