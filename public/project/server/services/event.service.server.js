module.exports = function(app, UserModel, EventModel) {
    var q = require('q');

    app.get('/api/project/event', getMostRecent);

    function getMostRecent(req, res) {
        var now = Date.now();
        EventModel
            .getMostRecent(10)
            .then(function(events) {
                var promises = [];
                for(var i in events) {
                    if (events[i]) {
                        var e = events[i];
                        promises.push(_renderEvent(e));
                    }
                }

                q.all(promises)
                    .then(function(renderedEvents) {
                        var later = Date.now()
                        res.json(renderedEvents).send();
                    }, function(err) {
                        console.log("Can't render all events: %j", err);
                        res.status(400).send("Can't find recent events");
                    });

            }, function(err) {
                console.log("Error retrieving events: %j", err);
                res.status(400).send("Can't find any events.");
            })
    }

    function _renderEvent(e) {
        var def = q.defer();
        var users = [e.userA, e.userB];
        UserModel
            .findUsersByIds(users)
            .then(function(users) {
                var mapped = {};
                for(var i in users) {
                    if(users[i]) {
                        var u = users[i];

                        if(String(u._id) == String(e.userA)) {
                            mapped['userA'] = u.username;
                        }
                        if(String(u._id) == String(e.userB)) {
                            mapped['userB'] = u.username;
                        }
                    }
                }

                var rendered = {
                    userA: mapped['userA'],
                    userB: mapped['userB'],
                    action: e.action,
                    timestamp: e.timestamp,
                };

                def.resolve(rendered);

            }, function(err) {
                console.log("Error finding users by ids in render event: %j", err);
                def.reject("Can't find users by ids");
            });

        return def.promise;
    }
}
