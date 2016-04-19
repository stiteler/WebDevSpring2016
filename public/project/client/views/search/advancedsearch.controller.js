(function () {
    'use strict';

    angular
        .module('FlairdropApp')
        .controller('AdvancedSearchController', AdvancedSearchController);

    function AdvancedSearchController($sce, RecommendService, UserService) {
        var model = this;
        model.addFilter = addFilter;
        model.query = query;
        model.setBeaconFilter = setBeaconFilter;
        model.trigger = trigger;

        function init() {
            model.user = UserService.getCurrentUser();
            console.log(model.user);
            model.flairFilters = [
                // {selected: false, value: model.user.flair1}, 
                // {selected: false, value: model.user.flair2}, 
                // {selected: false, value: model.user.flair3},
            ];

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

        function regionFilter(users) {
            // for ever user so far:
            // if their region doesn't match, remove it. 
            if(!model.regionFilter) {
                return users;
            } else {
                var filtered = [];
                var region = model.regionFilter
                for(var i in users) {
                    var user = users[i];
                    if(user.region && user.region.toLowerCase() == region.toLowerCase()) {
                        filtered.push(user);
                    }

                }
                return filtered;
            }
        }

        function setBeaconFilter(filter) {
            model.beaconFilter = filter;
            query();
        }

        function beaconFilter(users) { 
            if(!model.beaconFilter) {
                return users;
            } else {
                var filtered = [];
                var beacon = model.beaconFilter
                for(var i in users) {
                    var user = users[i];
                    if(user.beacon && user.beacon.toLowerCase() == beacon.toLowerCase()) {
                        filtered.push(user);
                    }

                }
                return filtered;
            }
        }

        function trigger($event) {
            if($event.keyCode === 13) {
                query();
            }
        }

        function nameFilter(users) {
            if(!model.nameFilter) {
                return users;
            } else {
                var filtered = [];
                console.log("Name filter is: ")
                var name = model.nameFilter.toLowerCase();
                console.log("SEARCHING FOR NAME: " + name);
                for(var i in users) {
                    var user = users[i];
                    var nameTokens = [];
                    if(user.firstName) {
                        nameTokens.push(user.firstName.toLowerCase());
                    }
                    if(user.lastName) {
                        nameTokens.push(user.lastName.toLowerCase());
                    }
                    for(var j = 0; j < nameTokens.length; j++) {
                        if(nameTokens.indexOf(name) >= 0) {
                            filtered.push(user);
                            break;
                        }
                    }
                }
                return filtered;
            }
        }

        function flairFilter(users) {

            var filterCount = 0;
            for(var k = 0; k < model.flairFilters.length; k++) {
                if(model.flairFilters[k].selected) {
                    filterCount += 1;
                }
            }
            if(filterCount < 1) {
                return users;
            }

            var flairFilters = [];
            for (var i in model.flairFilters) {
                if (model.flairFilters[i] &&
                    model.flairFilters[i].selected) {
                    flairFilters.push(model.flairFilters[i].value);
                }
            }
            var results = [];
            for(var i in users) {
                if(users[i]) {
                    var r = users[i];

                    if(flairFilters.indexOf(r.flair1) >= 0) {
                        results.push(r);
                        continue;
                    }
                    if(flairFilters.indexOf(r.flair2) >= 0) {
                        results.push(r);
                        continue;
                    }
                    if(flairFilters.indexOf(r.flair3) >= 0) {
                        results.push(r);
                        continue;
                    }
                }
            }
            return results; 
        }

        function query() {
            UserService
                .findAllUsers()
                .then(function(resp) {
                    var users = resp.data;

                    users = flairFilter(users);
                    // console.log("USERS AFTER FLAIR FILTER");
                    // console.log(users);

                    users = nameFilter(users);
                    // console.log("USERS AFTER NAME FILTER");
                    // console.log(users);

                    users = beaconFilter(users);
                    // console.log("USERS AFTER BEACON FILTER");
                    // console.log(users);

                    users = regionFilter(users);
                    // console.log("USERS AFTER REGION FILTER");
                    // console.log(users);


                    model.results = users;

                });
        }

    }
}());
