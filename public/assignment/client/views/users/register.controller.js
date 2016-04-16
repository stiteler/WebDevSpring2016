(function () {
    'use strict';

    angular
        .module('FormBuilderApp')
        .controller('RegisterController', RegisterController);

    function RegisterController(UserService, UtilsService) {
        var model = this;
        model.register = register;

        function register() {
            if (model.password != model.passwordVerify) {
                model.error = "Passwords must match."
                return;
            }

            var newUser = {
                username: model.username,
                password: model.password,
                emails: [model.email],
                phones: [],
                roles: [],
                firstName: '',
                lastName: '',
            };

            UserService.createUser(newUser)
                .then(function (created) {
                    console.log('CREATE USER:');
                    console.log(created.data);
                    if (created.data) {
                        console.log("New user:");
                        console.log(created.data);
                        UserService.setCurrentUser(created.data);
                        UtilsService.navigate('/profile');
                    }
                });
        }
    }
}());
