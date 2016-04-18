module.exports = function(app, UserModel, RecommendModel, EventModel) {
    app.post('/api/project/user/:id/recommend', createRecommend);
    app.get('/api/project/user/:id/recommend', getAllRecos);
    app.delete('/api/project/user/:id/recommend/:rid', deleteRecommend);

    function getAllRecos(req, res) {
        var userId = req.params.id;
        RecommendModel
            .findRecommendsByUserId(userId)
            .then(function(recos) {
                // converts recos into a map of flair: shortened list of recos
                var mapped = _mapRecos(recos);

                res.json(mapped);
            }, function(err) {
                console.log("Error getting recommendations: %j", err);
                res.status(400).send("Error getting recommendations");
            });
    }

    function _mapRecos(recos) {
        recoMap = {}
        for(var i in recos) {
            if(recos[i]) {
                var reco = recos[i];
                if(recoMap.hasOwnProperty(reco.recommendation)) {
                    recoMap[reco.recommendation].push(reco);
                } else {
                    recoMap[reco.recommendation] = [reco];
                }
            }
        }
        console.log("DONE MAPPING: %j", recoMap);

        // when done, render each list of recos:
        for (var key in recoMap) {
            if (recoMap.hasOwnProperty(key)) {
                recoMap[key] = _renderRecos(recoMap[key]);
            }
        }
        console.log("DONE RENDERING: %j", recoMap);

        return recoMap;
    }

    function _renderRecos(recos) {
        // shortens recos if too long;
        if(recos.length <= 5) {
            var rendered = [];
            for(var i in recos) {
                var reco = recos[i];
                var render = {
                    recommenderUsername: reco.recommenderUsername,
                    recommendation: reco.recommendation,
                    link: reco.recommenderUsername,
                    recommenderId: reco.recommenderId,
                    blurb: reco.blurb,
                }

                rendered.push(render);
                console.log("JUST PUSHED: %j", render);
            }
            return rendered;
        }

        // list too long, so modify it. 
        var rendered = [];
        for(var i = 0; i < 5; i++) {
            if(recos[i]) {
                var reco = recos[i];
                var render = {
                    recommenderUsername: reco.recommenderUsername,
                    recommendation: reco.recommendation,
                    link: reco.recommenderUsername,
                    recommenderId: reco.recommenderId,
                    blurb: reco.blurb,
                }

                rendered.push(render);
                console.log("JUST PUSHED: %j", render);
            }
        }
        var remaining = recos.length - 5;
        rendered.push({recommenderUsername: "and " + remaining + " others"});
        return rendered;
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
