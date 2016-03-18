module.exports = function(app, UserModel) {
    app.post('/api/assignment/user', createUser);
    app.get('/api/assignment/user', getUser);
    app.get('/api/assignment/user/:id', getUserById);
    app.put('/api/assignment/user/:id', updateUser);
    app.delete('/api/assignment/user/:id', deleteUser);

    var um = UserModel;

    function updateUser(req, res) {
        var uid = req.params.id;
        var updates = req.body;
        updates._id = uid;
        res.json(um.updateUser(updates));
    }

    function createUser(req, res) {
        var newUser = req.body;
        res.json(um.createUser(newUser));
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
        res.json(um.findUserByCredentials(username, password));
    }

    function getUserByUsername(req, res) {
        var username = req.query.username;
        res.json(um.findUserByUsername(username));
    }

    function getAllUsers(req, res) {
        res.json(um.findAllUsers());
    }

    function getUserById(req, res) {
        var uid = req.params.id;
        res.json(um.findUserById(uid));

    }

    function deleteUser(req, res) {
        var uid = req.params.id;
        res.json(um.deleteUserById(uid));
    }
};
