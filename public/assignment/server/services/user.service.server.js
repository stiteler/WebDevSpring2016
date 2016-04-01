module.exports = function(app, UserModel) {
    app.post('/api/assignment/user', createUser);
    app.get('/api/assignment/user', getUser);
    app.get('/api/assignment/user/:id', getUserById);
    app.put('/api/assignment/user/:id', updateUser);
    app.delete('/api/assignment/user/:id', deleteUser);

    function updateUser(req, res) {
        var uid = req.params.id;
        var updates = req.body;
        updates._id = uid;
        UserModel.updateUser(updates)
            .then(function(success) {
                console.log("update user success");
                console.log(success.lastName);
                res.json(success);
            }, function(err) {
                console.log("updateUser service error");
                console.log(err);
                res.status(400).json({"error": "Unable to update user at this time"});
            });
    }

    function createUser(req, res) {
        var newUser = req.body;
        UserModel
            .createUser(newUser)
            .then(function(user) {
                res.json(user);
            }, function(err) {
                console.log("createUser service error");
                console.log(err);
                res.status(400).json({"error": "Unable to create user at this time"});
            });

    }

    function getUser(req, res) {
        // need to switch on context
        if (req.query.username && req.query.password) {
            return login(req, res);
        } else if (req.query.username) {
            return getUserByUsername(req, res);
        } else {
            return getAllUsers(req, res);
        }
    }

    function login(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        UserModel
            .findUserByCredentials(username, password)
            .then(function(user) {
                console.log(user);
                res.status(200).json(user);
            }, function(err) {
                res.status(403).json(err);
            });
    }

    function getUserByUsername(req, res) {
        var username = req.query.username;
        res.json(UserModel.findUserByUsername(username));
    }

    function getAllUsers(req, res) {
        res.json(UserModel.findAllUsers());
    }

    function getUserById(req, res) {
        var uid = req.params.id;
        res.json(UserModel.findUserById(uid));

    }

    function deleteUser(req, res) {
        var uid = req.params.id;
        res.json(UserModel.deleteUserById(uid));
    }
};
