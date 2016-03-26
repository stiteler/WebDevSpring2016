(function () {
    'use strict';

    angular
        .module('FlairdropApp')
        .controller('ProfileEditController', ProfileEditController);

    function ProfileEditController($sce, $routeParams, $location, UserService, EmbedlyService) {
        var model = this;

        model.save = save;

        function init() {
            if (UserService.isLoggedIn()) {
                    model.profile = UserService.getCurrentUser();
                } else {
                    $location.path('/home');
                }

        }
        init();

        function save() {
            var updates = {
                firstName: model.profile.firstName,
                lastName: model.profile.lastName,
                industry: model.profile.industry,
                organization: model.profile.organization,
                region: model.profile.region,
                flair1: model.profile.flair1,
                flair2: model.profile.flair2,
                flair3: model.profile.flair3,
                imageUrl: model.profile.imageUrl,
                media: model.profile.media,
            };

            // handle any errors here later with toasts or something.
            UserService
                .updateUser(model.profile._id, updates)
                .then(function(resp) {
                    $location.path('/profile');
                });
        }
    }
}());
