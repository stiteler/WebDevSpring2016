module.exports = function(app, UserModel, EventModel) {
    var q = require('q');

    app.post('/api/project/user/:ida/connect/:idb', createConnection);
    app.delete('/api/project/user/:ida/connect/:idb', deleteConnection);
    // app.get('/api/project/user/:id/connect', getConnectionsById);
    app.get('/api/project/connect', getConnections);
    app.get('/api/project/user/:ida/connect/:idb', isConnected);

    function isConnected(req, res) {
        var ida = req.params.ida;
        var idb = req.params.idb;

        UserModel
        .findUserById(ida)
        .then(function(user) {
            if(user.connections.indexOf(idb) >= 0) {
                res.json({connected: true});
            } else {
                res.json({connected: false});
            }
        }, function(err) {
            console.log("Error determining user connection: %j", err);
            res.status(400).send("Can't lookup connection at this moment.");
        });
    }

    function getConnectionsById(req, res) {
        var uid = req.params.id;
        UserModel
        .findUserById(uid)
        .then(function(user) {
            UserModel
            .findUsersByIds(user.connections)
            .then(function(users) {
                res.json(users);
            }, function(err) {
                console.log("Error finding users by connections: %j", err);
                res.status(400).send("Unable to find connections");
            });
        }, function(err) {
            console.log("Can't find user in getConnections: %j", err);
            res.status(400).send("Unable to find that user");
        });
    }


    function getConnections(req, res) {
        if(req.user) {
            var uid = req.user._id;
            UserModel
            .findUserById(uid)
            .then(function(user) {
                UserModel
                .findUsersByIds(user.connections)
                .then(function(users) {
                    res.json(users);
                }, function(err) {
                    console.log("Error finding users by connections: %j", err);
                    res.status(400).send("Unable to find connections");
                });
            }, function(err) {
                console.log("Can't find user in getConnections: %j", err);
                res.status(400).send("Unable to find that user");
            });
        }

    }


    function createConnection(req, res) {
        var defa = q.defer();
        var defb = q.defer();

        var ida = req.params.ida;
        var idb = req.params.idb;

        if (ida == idb) {
            res.status(400).send("Can't connect to yourself");
        }

        UserModel
            .findUserById(ida)
            .then(function(user) {
                user.connections.push(idb);
                user.save();
                defa.resolve();
            }, function(err) {
                console.log("Error adding connection: %j", err);
                defa.reject();
            });

        UserModel
            .findUserById(idb)
            .then(function(user) {
                user.connections.push(ida);
                user.save();
                defa.resolve();
            }, function(err) {
                console.log("Error adding connection: %j", err);
                defa.reject();
            });

        q.all([defa, defb])
            .then(function() {
                console.log("Connection added");

                // log the event:
                var e = {
                    timestamp: Date.now(),
                    userA: ida,
                    userB: idb,
                    action: 'connect',
                };
                EventModel.addEvent(e);

                res.send(200);
            }, function(err) {
                console.log("Couldn't complete transaction: %j", err);
                res.status(400).send("Error adding connection.");
            });
    }

    function deleteConnection(req, res) {
        var defa = q.defer();
        var defb = q.defer();

        var ida = req.params.ida;
        var idb = req.params.idb;

        UserModel
            .findUserById(ida)
            .then(function(user) {
                user.connections.pull(idb);
                user.save();
                defa.resolve();
            }, function(err) {
                console.log("Error adding connection: %j", err);
                defa.reject();
            });

        UserModel
            .findUserById(idb)
            .then(function(user) {
                user.connections.pull(ida);
                user.save();
                defa.resolve();
            }, function(err) {
                console.log("Error adding connection: %j", err);
                defa.reject();
            });

        q.all([defa, defb])
            .then(function() {
                console.log("Connection removed");
                res.send(200);
            }, function(err) {
                console.log("Couldn't complete transaction: %j", err);
                res.status(400).send("Error removing connection.");
            });
    }

};
