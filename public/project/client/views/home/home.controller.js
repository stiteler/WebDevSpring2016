(function () {
    'use strict';

    angular
        .module('FlairdropApp')
        .controller('HomeController', HomeController);

    function HomeController(EventService, UserService) {
        var model = this;

        function init() {
            model.user = UserService.getCurrentUser();
            updateEvents();
        }
        init();

        function updateEvents() {
            EventService
                .getRecentEvents()
                .then(function(resp) {
                    var cleanEvents = [];
                    for(var i in resp.data) {
                        if(resp.data[i]) {
                            var event = resp.data[i];
                            if(event.hasOwnProperty('action')) {
                                cleanEvents.push(event);
                            }
                        }
                    }
                    model.events = cleanEvents;
                    if(model.events.length < 1) {
                        model.errorMessage = "Unable to load events at this time!";
                    }
                }, function(err) {
                    console.log("Error getting events:");
                    console.log(err);
                });
        }
    }
}());
