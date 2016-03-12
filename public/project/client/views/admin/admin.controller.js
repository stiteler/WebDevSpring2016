(function () {
    'use strict';

    angular
        .module('FlairdropApp')
        .controller('AdminController', AdminController);

    function AdminController($scope, $rootScope, UserService) {
        var vm = this;
        var us = UserService;

        vm.deleteUser = deleteUser;
        vm.selectUser = selectUser;
        vm.addUser = addUser;
        vm.updateUser = updateUser;

        function init() {
            // models:
            us.findAllUsers(function(result) {
                vm.users = result;
            });

        }
        init();

        function updateUser() {
            var user = vm.active;
            if(user) {
                us.updateUser(user._id, user, function(resp) {
                    if (resp) {
                        us.findAllUsers(function(result) {
                            vm.users = result;
                        });
                    }
                    vm.active = null;
                });
            }
        }

        function addUser() {
            var user = vm.active;
            us.createUser(user, function(resp) {
                us.findAllUsers(function(result) {
                    vm.users = result;
                });
                vm.active = null;
            });
        }

        function selectUser(user) {
            vm.active = user;
        }

        function deleteUser(userId) {
            us.deleteUserById(userId, function(resp) {
                vm.users = resp;
            });
        }
    }
}());
