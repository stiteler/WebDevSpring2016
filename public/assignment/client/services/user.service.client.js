(function () {
    'use strict';

    angular
        .module('FormBuilderApp')
        .factory('UserService', UserService);

    function UserService() {
        var users = _getUsers();

        var api = {
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            getUserByUserId: getUserByUserId,
        };
        return api;

        function findUserByUsernameAndPassword(username, password, callback) {
            var retr = null;
            for (var i in users) {
                if (users[i]) {
                    var user = users[i];
                    if (username === user.username && password === user.password) {
                        retr = user;
                    }
                }
            }
            callback(retr);
        }

        function findAllUsers(callback) {
            callback(users);
        }

        function getUserByUserId(userId, callback) {
            var user = _getUserById(userId);
            if (user) {
                callback(_copyUser(user));
            } else {
                callback(null);
            }
        }

        function createUser(user, callback) {
            var uid = (new Date()).getTime();
            user._id = uid;

            // we want to make a copy here to avoid
            // $scope.user pointer issues.
            users.push(_copyUser(user));
            callback(user);
        }

        function deleteUserById(userId, callback) {
            var user = _getUserById(userId);
            if (user) {
                var index = users.indexOf(user);
                users.splice(index, 1);
                callback(users);
            }
        }

        function updateUser(userId, user, callback) {
            var existing = _getUserById(userId);
            if (existing) {
                for (var attr in user) {
                    if (user[attr]) {
                        existing[attr] = user[attr];
                    }
                }
                // copy user here again to avoid scoping issues
                callback(_copyUser(existing));
            } else {
                callback(null);
            }
        }

        function _getUserById(userId) {
            for (var i in users) {
                if (users[i]) {
                    var user = users[i];
                    if (user._id === userId) {
                        return user;
                    }
                }
            }
            return null;
        }

        function _copyUser(user) {
            var copy = {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                password: user.password,
                email: user.email,
                roles: user.roles,
            };
            return copy;
        }

        function _getUsers() {
            return [
                {
                    _id: 123,
                    firstName: 'Alice',
                    lastName: 'Wonderland',
                    username: 'alice',
                    password: 'alice',
                    roles: ['student']
                },
                {
                    _id: 234,
                    firstName: 'Bob',
                    lastName: 'Hope',
                    username: 'bob',
                    password: 'bob',
                    roles: ['admin']
                },
                {
                    _id: 345,
                    firstName: 'Charlie',
                    lastName: 'Brown',
                    username: 'charlie',
                    password: 'charlie',
                    roles: ['faculty']
                },
                {
                    _id: 456,
                    firstName: 'Dan',
                    lastName: 'Craig',
                    username: 'dan',
                    password: 'dan',
                    roles: ['faculty', 'admin']
                },
                {
                    _id: 567,
                    firstName: 'Edward',
                    lastName: 'Norton',
                    username: 'ed',
                    password: 'ed',
                    roles: ['student']
                }
            ];
        }
    }
}());
