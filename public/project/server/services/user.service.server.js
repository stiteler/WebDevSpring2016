module.exports = function(app, UserModel) {
    app.post('/api/project/user', createUser);
    app.get('/api/project/user', getUser);
    app.get('/api/project/user/:id', getUserById);
    app.put('/api/project/user/:id', updateUser);
    app.delete('/api/project/user/:id', deleteUser);

    function updateUser(req, res) {
        var uid = req.params.id;
        var updates = req.body;
        updates._id = uid;
        res.json(UserModel.updateUser(updates));
    }

    function createUser(req, res) {
        var newUser = req.body;
        res.json(UserModel.createUser(newUser));
    }

    function getUser(req, res) {
        console.log('in getUser');
        console.log(req.params);
        console.log(req.query);
        console.log(req.body);
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
        user = UserModel.findUserByCredentials(username, password);
        if (user) {
            res.json(user);
        } else {
            res.status(403).json({error: "Invalid username/password combination."});
        }
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
}
