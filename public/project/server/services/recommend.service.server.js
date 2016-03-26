module.exports = function(app, UserModel, RecommendModel) {
    app.post('/api/project/user/:id/recommend', createRecommend);
    app.get('/api/project/user/:id/recommend', getAllRecos);
    app.delete('/api/project/user/:id/recommend/:rid', deleteRecommend);

    function getAllRecos(req, res) {
        var userId = req.params.id;
        if(userId) {
            res.json(RecommendModel.findRecommendsByUserId(userId));
        } else {
            res.status(400).send("No user by that Id");
        }
    }

    function createRecommend(req, res) {
        var recommendeeId = req.params.id;
        var newReco = req.body;
        res.json(RecommendModel.createRecommend(recommendeeId, newReco))
    }

    function deleteRecommend(req, res) {
        var uid = req.params.id;
        var rid = req.params.rid;
        res.json(RecommendModel.deleteRecommend(uid, rid));
    }
}
