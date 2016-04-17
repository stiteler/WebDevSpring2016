module.exports = function(app, UserModel) {
    // app.post('/api/project/user', createUser); // repl. by register?
    app.get('/api/project/user', getAllUsers);
    app.get('/api/project/user/:id', getUserById);
    app.put('/api/project/user/:id', updateUser);
    app.delete('/api/project/user/:id', deleteUser);

    function updateUser(req, res) {
        var uid = req.params.id;
        var updates = req.body;

        UserModel.updateUser(uid, updates)
            .then(function(success) {
                res.json(success);
            }, function(err) {
                console.log("updateUser service error: %j", err);
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
                console.log("createUser service error: %j", err);
                res.status(400).json({"error": "Unable to create user at this time"});
            });
    }

    function getUserByUsername(req, res) {
        var username = req.query.username;
        UserModel
            .findUserByUsername(username)
            .then(function(user) {
                res.json(user);
            }, function(err) {
                console.log("error fetching user by username: %j", err);
                res.statuts(400).json({error: "Unable to find user with that username"});
            });
    }

    function getAllUsers(req, res) {
        UserModel
            .findAllUsers()
            .then(function(users) {
                res.json(users);
            }, function(err) {
                res.status(400).json({error: "Unable to find users"});
            });
    }

    function getUserById(req, res) {
        var uid = req.params.id;
        UserModel
            .findUserById(uid)
            .then(function(user) {
                res.json(user);
            }, function(err) {
                console.log("Error getting User By Id: %j", err);
                res.status(400).json("Unable to find User");
            });
    }

    function deleteUser(req, res) {
        var uid = req.params.id;

        UserModel
            .deleteUserById(uid)
            .then(function(success) {
                res.send(200);
            }, function(err) {
                console.log("Error deleting user by Id");
                res.status(400).send("Unable to delete user.");
            });
    }
}
