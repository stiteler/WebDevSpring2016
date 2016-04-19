(function () {
    'use strict';

    angular
        .module('FlairdropApp')
        .controller('HomeController', HomeController);

    function HomeController(EventService, UserService, EmbedlyService, $sce, ImageService) {
        var model = this;
        model.resize = ImageService.resize;

        function init() {
            model.isLoggedIn = UserService.isLoggedIn;
            model.user = UserService.getCurrentUser();
            updateEvents();
            
        }
        init();

        function updateEvents() {
            EventService
                .getRecentEvents()
                .then(function(resp) {

                    // scrub events for actions.
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
                    _renderMedia();

                }, function(err) {
                    console.log("Error getting events:");
                    console.log(err);
                });
            }

        function _renderMedia() {
            for(var i in model.events) {
                if(model.events[i].action == 'mediaUpdate') {
                    var e = model.events[i];
                    var index = model.events.indexOf(e);
                    model.events.splice(index, 1);

                    EmbedlyService
                    .getEmbedByMediaUrl(e.context)
                    .then(function(oembed) {

                        var iframe = $sce.trustAsHtml(oembed.data.html);
                        var newEvent = {
                            action: e.action,
                            iframe: iframe,
                            context: e.context,
                            userA: e.userA,
                            userB: e.userB
                        }
                        // console.log("new event is: ");
                        // console.log(newEvent);

                        model.events.push(newEvent);

                        // console.log("new events are: ");
                        // console.log(model.events);
                    },
                    function(err) {
                        model.errorMessage = "There was an error loading some media! Oh no...";
                    });
                }
            }
        }

        // function updateEvents() {
        //     // this is a tricky function, could def. be pulled apart but
        //     // basically we need to check every event for a valid action.
        //     // if it contains a media embed we need to asycnhronously grab
        //     // that iframe from our embedly api.  After that's done, we wait
        //     // on the rest of the promises for each event and then render the page.
        //     EventService
        //         .getRecentEvents()
        //         .then(function(resp) {

        //             // scrub events for actions.
        //             var cleanEvents = [];
        //             for(var i in resp.data) {
        //                 if(resp.data[i]) {
        //                     var event = resp.data[i];
        //                     if(event.hasOwnProperty('action')) {
        //                         cleanEvents.push(event);
        //                     }
        //                 }
        //             }

        //             var promises = [];
        //             for(var k = 0; k < cleanEvents.length; k++) { 
        //                 if(cleanEvents[k]) {
        //                     var deferred = $q.defer();       
        //                     var e = cleanEvents[k];

        //                     if(e.action == 'mediaUpdate') {
        //                         EmbedlyService
        //                             .getEmbedByMediaUrl(e.context)
        //                             .then(function(oembed) {
        //                                 e.iframe = $sce.trustAsHtml(oembed.data.html);
        //                                 deferred.resolve(e);
        //                             },
        //                             function(err) {
        //                                 model.errorMessage = "There was an error loading some media! Oh no...";
        //                                 deferred.reject("Unable to find iframe");
        //                             });

        //                     } else {
        //                         deferred.resolve(e);
        //                     }
        //                     promises.push(deferred.promise);
        //                 }
        //             }

        //             console.log("iter over results:")
        //             for (var j = 0; j < promises.length; j++) {
        //                 $q.when(promises[j]).then(function(value) {
        //                     console.log(value);
        //                 }, function(err) {
        //                     console.log(err);
        //                 });
        //             }

        //             // $q.all(promises)
        //             //     .then(function(finished) {
        //             //         console.log("first");
        //             //         console.log(finished[0]);
        //             //         console.log("IN Q ALL:");
        //             //         console.log(finished);
        //             //         model.events = finished;
        //             //         console.log("DONE! model.finished is");
        //             //         console.log(model.finished);

        //             //         if(model.finished.length < 1) {
        //             //             model.errorMessage = "Unable to load finished at this time!";
        //             //         }
        //             //     }, function(err) {
        //             //         console.log("Error retrieving all promises:");
        //             //         console.log(err);
        //             //     });

        //             // $rootScope.$apply();

        //         }, function(err) {
        //             console.log("Error getting events:");
        //             console.log(err);
        //         });
        // }
    }
}());
