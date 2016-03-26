module.exports = function(app, UserModel) {
    var api = {
        createRecommend: createRecommend,
        findRecommendsByUserId: findRecommendsByUserId,
        deleteRecommend: deleteRecommend
    };
    return api;

    function findRecommendsByUserId(userId) {
        var user = UserModel.findUserById(userId);
        if(user) {
            return user.recommends;
        }
    }

    function createRecommend(recommendeeId, recommend) {
        var recommendee = UserModel.findUserById(recommendeeId);
        recommend._id = (new Date()).getTime();
        recommendee.recommends.push(recommend);
        return recommend;
    }

    function deleteRecommend(userId, recommendId) {
        var recommendee = UserModel.findUserById(userId);
        var recos = recommendee.recos;
        for (var i in recos) {
            if(recos[i]) {
                var reco = recos[i];
                if(reco._id === recommendId) {
                    var index = recos.indexOf(reco);
                    recos.splice(index, 1);
                }
            }
        }
    }
};
