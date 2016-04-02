(function () {
    'use strict';

    angular
        .module('FormBuilderApp')
        .controller('ProfileController', ProfileController);

    function ProfileController(UserService, UtilsService, $location) {
        var model = this;

        model.update = update;

        if (UtilsService.isLoggedIn()) {
            var userId = UserService.getCurrentUser()._id;
        } else {
            $location.url('/home');
        }

        function init() {
            renderActive();
        }
        init();

        function update() {
            var updated = _unrenderActive();

            UserService
                .updateUser(model.active._id, updated)
                .then(function (result) {
                    UserService.setCurrentUser(angular.copy(updated));
                });
        }

        // model.active will be the rendered CSV sep. email/phone user
        // model.user is the underlying representation
        // certainly could validate this info, but I don't know why we need multple anyways
        // as per the schema.
        function renderActive() {
            var current = angular.copy(UserService.getCurrentUser());
            var realArrayEmails = [];
            for (var i in current.emails) {
                realArrayEmails.push(current.emails[i]);
            }

            var realArrayPhones = [];
            for (var i in current.phones) {
                realArrayPhones.push(current.phones[i]);
            }

            current.emails = realArrayEmails.join(',');
            current.phones = realArrayPhones.join(',');
            model.active = current;
        }

        function _unrenderActive() {
            var user = angular.copy(model.active);
            user.emails = user.emails.split(',');
            user.phones = user.phones.split(',');
            return angular.copy(user);
        }
    }
}());
