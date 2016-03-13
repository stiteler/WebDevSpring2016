module.exports = function(app, UserModel) {
    var um = UserModel;

    console.log("All Users Test");
    console.log(um.findAllUsers());
}
