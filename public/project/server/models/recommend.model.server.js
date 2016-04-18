module.exports = function(UserModel, mongoose) {
    var q = require('q');

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
                // users shouldn't recommend themselves and
                // recommenderId::recommend pairs can't be duplicated.
                if(user._id == recommend.recommenderId) {
                    def.reject("Can't recommend Self.");
                }

                for(var i in user.recommends) {
                    var reco = user.recommends[i];
                    if(reco.recommenderId == recommend.recommenderId &&
                         reco.recommend == recommend.recommend) {
                        def.reject("Duplicate Recommendation.");
                        return;
                    }
                }

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
