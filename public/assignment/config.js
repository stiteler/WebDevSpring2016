(function(){
  angular
    .module("FormBuilderApp")
    .config(function($routeProvider){
      $routeProvider
        .when("/home", {
          templateUrl: "views/home/home.view.html",
          controller: "views/home/home.controller.js"
        })
        .when("/profile", {
            templateUrl: "views/user/profile.html"
            controller: "views/home/home.controller.js"
        })
        .when("/admin", {
            templateUrl: "views/admin/admin.html"
            controller: "views/admin/admin.controller.js"
        })
        .when("/forms", {
            templateUrl: "views/forms/forms.html"
            controller: "views/forms/forms.controller.js"
        })
        .when("/fields", {
            templateUrl: "views/forms/fields.html"
            controller: "views/forms/fields.controller.js"
        })
        .when("/login", {
            templateUrl: "views/users/login.html"
            controller: "views/users/login.controller.js"
        })
        .when("/register", {
            templateUrl: "views/users/register.html"
            controller: "views/users/register.controller.js"
        })
        .otherwise({
            redirectTo: "/home"
        });
    });
})();