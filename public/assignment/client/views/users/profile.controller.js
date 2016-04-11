(function () {
    'use strict';

    angular
        .module('FormBuilderApp')
        .controller('ProfileController', ProfileController);

    function ProfileController(UserService, UtilsService, $location) {
        var model = this;

        model.update = update;

        if (!UtilsService.isLoggedIn()) {
            console.log('Not Logged In.');
            $location.url('/home');
        }
 
        // if (UtilsService.isLoggedIn()) {
        //     // var userId = UserService.getCurrentUser()._id;
        //     // UserService.getCurrentUser()
        //     //     .then(function(user) {
        //     //         if(user) {
        //     //             console.log('found user: ');
        //     //             console.log(user);
        //     //             var userId = user._id;
        //     //         }
        //     //     })
        //     // get current user
        // } else {
        //     console.log("Not logged in");
        //     $location.url('/home');
        // }

        function init() {
            renderActive();
        }
        init();

        function update() {
            // var upid = userId;
            var upid = model.active._id;
            var updated = _unrenderActive();
            // make mongo happy
            delete updated._id;

            UserService
                .updateUser(upid, updated)
                .then(function (result) {
                    UserService.setCurrentUser(angular.copy(updated));
                });
        }

        // model.active will be the rendered CSV sep. email/phone user
        // model.user is the underlying representation
        // certainly could validate this info, but I don't know why we need multple anyways
        // as per the schema.
        function renderActive() {
            UserService
                .getCurrentUser()
                .then(function(resp) {
                    var current = resp.data;
                    console.log("render active:");
                    console.log(current);
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
                });

        }

        function _unrenderActive() {
            var user = angular.copy(model.active);
            user.emails = user.emails.split(',');
            user.phones = user.phones.split(',');
            return angular.copy(user);
        }
    }
}());
