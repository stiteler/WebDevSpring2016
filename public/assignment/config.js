(function(){
  angular
    .module("FormBuilderApp")
    .config(function($routeProvider){
      $routeProvider
        .when("/home", {
          templateUrl: "views/home/home.view.html"
        })
        .when("/profile", {
            templateUrl: "views/user/profile.view.html"
        })
        .when("/admin", {
            templateUrl: "views/admin/admin.view.html"
        })
        .when("/forms", {
            templateUrl: "views/forms/forms.view.html"
        })
        .when("/fields", {
            templateUrl: "views/forms/fields.view.html"
        })
        .when("/login", {
            templateUrl: "views/users/login.view.html"
        })
        .when("/register", {
            templateUrl: "views/users/register.view.html"
        })
        .otherwise({
            redirectTo: "/home"
        });
    });
})();