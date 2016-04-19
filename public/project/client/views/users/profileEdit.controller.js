(function () {
    'use strict';

    angular
        .module('FlairdropApp')
        .controller('ProfileEditController', ProfileEditController);

    function ProfileEditController($sce, $routeParams, $location, UserService, EmbedlyService, ImageService) {
        var model = this;

        model.save = save;
        model.setBeacon = setBeacon;
        model.resize = ImageService.resize;

        function init() {
            model.profile = UserService.getCurrentUser();
        }
        init();

        function setBeacon(beacon) {
            model.profile.beacon = beacon;
        }

        function save() {
            var updates = {
                firstName: model.profile.firstName,
                lastName: model.profile.lastName,
                industry: model.profile.industry,
                organization: model.profile.organization,
                beacon: model.profile.beacon,
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
                    console.log("Update response (client)");
                    console.log(resp.data);
                    $location.path('/profile');
                });
        }
    }
}());
