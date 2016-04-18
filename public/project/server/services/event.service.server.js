module.exports = function(app, UserModel, EventModel) {
    app.get('/api/project/event', getMostRecent);

    function getEvents() {
        EventModel
            .getMostRecent(10)
            .then(function(events) {

                var preparedEvents = [];
                for(var i : events) {
                    if (events[i]) {
                        // prepare the events for render.
                        var e = events[i];
                        preparedEvents.push(_renderEvent(e));
                    }
                }

                res.json(preparedEvents);
            }, function(err) {
                console.log("Error retrieving events: %j", err);
                res.status(400).send("Can't find any events.");
            })
    }

    function _renderEvent(e) {
        var userA = _userIdToUser(e.userA);
        if(e.userB) {
            var userB = _userIdToUser(e.userB);
        }

        e.userA = userA;
        e.userB = userB;
        // e.pretty = _getPretty(e);
        preparedEvents.push(e);
    }

    // better to render in angular on frontend
    // function _getPretty(e) {
    //     if(e.action == 'connect') {
    //         return prettyReco(e);
    //     } else if(e.action == 'recommend') {
    //         return
    //     }
    // }

    // function prettyConnect(e) {
    //     return e.userA + " connected with " + e.userB.username;
    // }

    // function prettyReco(e) {
    //     return e.userA.username + " recommended " +
    //          e.userB.username + " for their " + e.context + " flair!";
    // }

    function _userIdToUser(userId) {
        UserModel
            .findUserById(user)
            .then(function(user) {
                return user;
            });
    }

}
