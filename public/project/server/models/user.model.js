module.exports = function(app) {
    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUserById: deleteUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
    };
    return api;

    // we only need this without mongo for now.
    function findAllUsers() {
        if (global.users) {
            return global.users;
        }
        var fs = require('fs');
        // only till we implement mongo
        global.users = JSON.parse(
                fs.readFileSync(
                    './public/project/server/models/user.mock.json', 'utf8'));
        return global.users;
    }

    function findUserById(userId) {
        return _findUserByKey('_id', userId);
    }

    function findUserByUsername(username) {
        return _findUserByKey('username', username);
    }

    function findUserByCredentials(username, password) {
        var users = findAllUsers();
        for (var i in users) {
            if (users[i]) {
                var u = users[i];
                if (u.password == password && u.username == username) {
                    return u;
                }
            }
        }
        return null;
    }

    function createUser(user) {
        // eventually mongo's job.. just for now
        var users = findAllUsers();
        user._id = (new Date()).getTime();
        users.push(user);
        return user;
    }

    function updateUser(updates) {
        var existing = findUserById(updates._id);
        if (existing) {
            for (var key in updates) {
                if (updates.hasOwnProperty(key)) {
                    existing[key] = updates[key];
                }
            }
            return existing;
        }
        return null;
    }

    function deleteUserById(userId) {
        var users = findAllUsers();
        var user = findUserById();
        if (user) {
            var index = users.indexOf(user);
            users.splice(index, 1);
        }
    }

    function _findUserByKey(key, value) {
        var users = findAllUsers();
        for (var i in users) {
            if (users[i]) {
                var u = users[i];
                if (u[key] == value) {
                    return u;
                }
            }
        }
        return null;
    }
};
