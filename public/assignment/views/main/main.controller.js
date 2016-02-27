(function () {
    angular
        .module('FormBuilderApp')
        .controller('MainController', MainController);

    function MainController($location) {
        console.log('Inside Main Controller');
    }

})();
