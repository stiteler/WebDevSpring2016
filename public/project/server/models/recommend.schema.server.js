module.exports = function(mongoose) {
    var RecommendSchema = mongoose.Schema({
        recommenderId: mongoose.Schema.Types.ObjectId,
        recommendation: String,
        recommenderUsername: String,
        blurb: String,

    }, {collection: 'project-recommendations'});

    return RecommendSchema;

};
