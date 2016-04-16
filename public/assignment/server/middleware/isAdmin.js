module.exports = function(req, res, next) {
    var adminBase = '/api/assignment/admin/user'
    var path = req.originalUrl;

    if(path.indexOf(adminBase) >= 0) {
        console.log('checking for admin url.');
        if(!req.user) {
            console.log("NO USER: FAILING")
            // someone not logged in trying to access admin url.
            fail();
        }

        var user = req.user
        if(user.roles.indexOf('admin') >= 0) {
            console.log("FOUND ADMIN, PASSING REQUEST");
            // user is logged in and is admin.
            next();
        } else {
            console.log("USER IS NOT ADMIN");
            fail();
        }
    } else {
        // no need to check.
        next();
    }

    function fail() {
        res.status(403).send("Not Admin");
    }
}
