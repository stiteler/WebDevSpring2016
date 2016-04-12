(function () {
    'use strict';

    angular
        .module('FormBuilderApp')
        .controller('AdminController', AdminController);

    function AdminController(UserService, $location) {
        var model = this;

        model.deleteUser = deleteUser;
        model.editUser = editUser;
        model.addUser = addUser;
        model.updateUser = updateUser;
        model.clearSelected = clearSelected;
        model.setSortBy = setSortBy;
        model.sortBy = '';
        model.toggleSort = toggleSort;

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
            UserService
                .deleteUserById(user._id)
                .then(function(resp) {
                    console.log("DELETE OK");
                    _refresh();
                });
        }

        function editUser(user) {
            console.log("edit clicked");
            model.selected = angular.copy(user);
        }

        function addUser() {
            var newUser = {
                username: model.selected.username,
                password: model.selected.password,
                emails: [],
                phones: [],
                firstName: model.selected.firstName,
                lastName: model.selected.lastName,
                roles: []
            };

            UserService
                .createUser(model.selected)
                .then(function(success) {
                    _refresh();
                }, function(err) {
                    console.log("Unable to add user");
                    console.log(err);
                })
        }

        function updateUser() {
            UserService
                .updateUser(model.selected._id, model.selected)
                .then(function(success) {
                    _refresh();
                });
        }

        function _refresh() {
            model.selected = null;
            UserService
                .findAllUsers()
                .then(function(resp){
                    if(resp.data) {
                        model.users = resp.data;
                    }
                });
        }
    }
}());
