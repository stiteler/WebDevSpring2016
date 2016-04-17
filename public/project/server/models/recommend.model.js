module.exports = function(app, UserModel) {
    var api = {
        createRecommend: createRecommend,
        findRecommendsByUserId: findRecommendsByUserId,
        deleteRecommend: deleteRecommend
    };
    return api;

    function findRecommendsByUserId(userId) {
        var def = q.defer();

        UserModel
            .findUserById(mongoose.Types.ObjectId(userId))
            .then(function(user) {
                def.resolve(user.recommends);
            }, function(err) {
                console.log("Error finding recommends for user: %j", err);
                def.reject();
            });

        return def.promise;
    }

    function createRecommend(recommendeeId, recommend) {
        var def = q.defer();

        UserModel
            .findUserById(mongoose.Types.ObjectId(recommendeeId))
            .then(function(user) {
                user.recommends.push(recommend);
                user.save();
                deferred.resolve(user.recommends);
            }, function(err) {
                console.log("Error creating recommend: %j", err);
                deferred.reject();
            })

        return def.promise;
    }

    function deleteRecommend(userId, recommendId) {
        var def = q.defer();

        UserModel
            .findUserById(userId)
            .then(function(user) {
                user.recommends.pull({_id: recommendId});
                user.save();
                deferred.resolve(user.recommends);
            }, function(err) {
                console.log("Error deleting recommend: %j", err);
                deferred.reject();
            });

        return def.promise;
    }
};
