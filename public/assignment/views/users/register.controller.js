(function () {
    angular
        .module('FormBuilderApp')
        .controller('RegisterController', RegisterController);

    function RegisterController($scope, $rootScope, UserService, UtilsService) {
        var _uid = 9999;
        $scope.register = register;

        function register() {
            // verify password's match here, when required.
            var newUser = {
                password: $scope.password,
                username: $scope.username,
                email: $scope.email,
                // eventually going to be retrieved from model
                _id: _uid++,
            };

            UserService.createUser(newUser, function (created) {
                // put new user in root scope.
                $rootScope.user = created;
                UtilsService.navigate('/profile');
            });
        }
    }
}());
