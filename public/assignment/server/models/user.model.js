module.exports = function(app) {
    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUserById: deleteUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
    }
    return api;

    var users = findAllUsers();

    function findAllUsers() {
        if (users) {
            return users;
        }
        var fs = require('fs');
        return JSON.parse(fs.readFileSync('./public/assignment/server/models/user.mock.json', 'utf8'));
    }

    function findUserById(userId) {
        return _findUserByKey('_id', userId);
    }

    function findUserByUsername(username) {
        return _findUserByKey('username', username);
    }

    function findUserByCredentials(username, password) {
        var users = findAllUsers();
        for(var i in users) {
            if (users[i]) {
                var u = users[i];
                if (u.password == password && u.username == username) {
                    return u
                }
            }
        }
        return null;
    }

    function createUser(user) {
        user._id = (new Date()),getTime();
        users.push(user);
        return users;
    }

    function updateUser(updates) {
        var existing = findUserById(updates._id);
        if (existing) {
            for (var key in updates) {
                if (updates[key]) {
                    var u = updates[i];
                    existing[attr] = u;
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
        for(var i in users) {
            if (users[i]) {
                var u = users[i];
                if (u[key] == value) {
                    return u
                }
            }
        }
        return null;
    }
}
