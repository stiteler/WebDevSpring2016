(function () {
    'use strict';

    angular
        .module('FlairdropApp')
        .controller('SearchController', SearchController);

    function SearchController($sce, RecommendService, UserService) {
        var model = this;
        model.addFilter = addFilter;
        model.query = query;

        function init() {
            model.user = UserService.getCurrentUser();
            console.log(model.user);
            model.flairFilters = [
                {selected: true, value: model.user.flair1}, 
                {selected: true, value: model.user.flair2}, 
                {selected: true, value: model.user.flair3},
            ];

            console.log("Flair filters:");
            console.log(model.flairFilters);
            query();
        }
        init();

        function addFilter(keyEvent) {
            if (keyEvent.which === 13) {
                model.flairFilters.push({selected: true, value: model.newFilter});
                model.newFilter = null;
                query();
            }

        }

        function query() {
            // for now:
            var all = [];
            UserService
                .findAllUsers()
                .then(function(resp) {
                    all = resp.data;
                })
                .then(function() {
                    var filters = [];
                    for (var i in model.flairFilters) {
                        if (model.flairFilters[i] &&
                            model.flairFilters[i].selected) {
                            filters.push(model.flairFilters[i].value);
                        }
                    }

                    model.results = [];

                    for(var i in all) {
                        if(all[i]) {
                            var r = all[i];

                            if(filters.indexOf(r.flair1) >= 0) {
                                model.results.push(r);
                                continue;
                            }
                            if(filters.indexOf(r.flair2) >= 0) {
                                model.results.push(r);
                                continue;
                            }
                            if(filters.indexOf(r.flair3) >= 0) {
                                model.results.push(r);
                                continue;
                            }


                        }
                    }

                });
        }

    }
}());
