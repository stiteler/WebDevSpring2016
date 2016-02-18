(function(){
    angular
        .module("FormBuilderApp")
        .factory("UtilsService", UtilsService);

    function UtilsService($location) {
        var api = {
            isActive: isActive
        };
        return api;

        function isActive(location) {
            return $location.path() == location;
        };
    }
}());