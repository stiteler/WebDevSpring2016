(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $rootScope, UserService, UtilsService) {
        $scope.login = login

        function login() {
            var user = null;
            un = $scope.username;
            pw = $scope.password;

            UserService.findUserByUsernameAndPassword(un, pw, function(res) {
                if(typeof(res) != 'undefined') {
                    $rootScope.user = res;
                    UtilsService.navigate("/profile");
                } else {
                    console.log("no such user");
                    // for the love of god
                    // don't 'alert' anyone. just handle it.
                    alert("Please try again");
                }
            });
        };
    }
}());