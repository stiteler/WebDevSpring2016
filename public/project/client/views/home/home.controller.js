(function () {
    'use strict';

    angular
        .module('FlairdropApp')
        .controller('HomeController', HomeController);

    function HomeController(EventService) {
        var model = this;

        function init() {
        	EventService
        		.getRecentEvents()
        		.then(function(resp) {
        			console.log("EVENTS:");
        			console.log(resp.data);
        			model.events = resp.data;
        		});
        }
        init();

    }
}());
