module.exports = function(app, UserModel, RecommendModel, EventModel) {
    app.post('/api/project/user/:id/recommend', createRecommend);
    app.get('/api/project/user/:id/recommend', getAllRecos);
    app.delete('/api/project/user/:id/recommend/:rid', deleteRecommend);

    function getAllRecos(req, res) {
        var userId = req.params.id;
        RecommendModel
            .findRecommendsByUserId(userId)
            .then(function(recos) {
                res.json(recos);
            }, function(err) {
                console.log("Error getting recommendations: %j", err);
                res.status(400).send("Error getting recommendations");
            });
    }

    function createRecommend(req, res) {
        var recommendeeId = req.params.id;
        var newReco = req.body;

        RecommendModel
            .createRecommend(recommendeeId, newReco)
            .then(function(success) {
                var e = {
                    timestamp: Date.now(),
                    userA: newReco.recommenderId,
                    userB: recommendeeId,
                    event: 'recommend',
                    context: newReco.recommendation
                };
                EventModel.addEvent(e);

                res.json(success);
            }, function(err) {
                console.log("Error creating reccomend: %j", err);
                res.status(400).send("Unable to create recommendation.");
            });
    }

    function deleteRecommend(req, res) {
        var uid = req.params.id;
        var rid = req.params.rid;
        RecommendModel
            .deleteRecommend(uid, rid)
            .then(function(success) {
                res.status(200).send();
            }, function(err) {
                console.log("Error deleting recommend: %j", err);
                res.status(400).send("Error deleting recommendation.");
            })
    }
}
