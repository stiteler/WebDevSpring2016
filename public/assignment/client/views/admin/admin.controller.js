(function () {
    'use strict';

    angular
        .module('FormBuilderApp')
        .controller('AdminController', AdminController);

    function AdminController(AdminService, $location) {
        var model = this;

        model.deleteUser = deleteUser;
        model.editUser = editUser;
        model.addUser = addUser;
        model.updateUser = updateUser;
        model.clearSelected = clearSelected;
        model.setSortBy = setSortBy;
        model.sortBy = '';
        model.toggleSort = toggleSort;
        model.renderRoles = renderRoles;

        function init() {
            _refresh();
        }
        init();

        function setSortBy(value) {
            model.sortBy = value;
        }

        function toggleSort(field) {
            // if current sort is NOT already this field, turn it on.
            if(model.sortBy.indexOf(field) < 0) {
                model.sortBy = '+' + field;
            }
        }

        function clearSelected() {
            console.log("clear clicked");
            model.selected = null;
        }

        function deleteUser(user) {
            console.log("delete clicked");
            AdminService
                .deleteUserById(user._id)
                .then(function(resp) {
                    console.log("DELETE OK");
                    _refresh();
                });
        }

        function editUser(user) {
            console.log("edit clicked");
            model.selected = angular.copy(user);
            model.originalCopy = angular.copy(user);
        }

        function addUser() {
            var newUser = {
                username: model.selected.username,
                password: model.selected.password,
                emails: [],
                phones: [],
                firstName: model.selected.firstName,
                lastName: model.selected.lastName,
                roles: unrenderRoles(model.selected.roles)
            };

            AdminService
                .createUser(newUser)
                .then(function(success) {
                    _refresh();
                }, function(err) {
                    console.log("Unable to add user");
                    console.log(err);
                })
        }

        function updateUser() {
            var toUpdate = angular.copy(model.selected)
            toUpdate.roles = unrenderRoles(toUpdate.roles);

            if(model.originalCopy.password == model.selected.password) {
                // pasword not changed:
                delete toUpdate.password;
            } // else it will get rehashed.

            AdminService
                .updateUser(toUpdate._id, toUpdate)
                .then(function(success) {
                    _refresh();
                });
        }

        function renderRoles(roles) {
            var rolesArray = [];
            for (var i in roles) {
                rolesArray.push(roles[i]);
            }
            return rolesArray.join(', ');
        }

        function unrenderRoles(roles) {
            console.log(roles);
            var unrendered = roles.split(', ');
            console.log(unrendered);
            // string to array
            return unrendered;

        }

        function _refresh() { 
            model.selected = null;
            model.originalCopy = null;
            AdminService
                .findAllUsers()
                .then(function(resp){
                    if(resp.data) {
                        console.log(resp.data);
                        model.users = resp.data;
                    }
                });
        }
    }
}());
