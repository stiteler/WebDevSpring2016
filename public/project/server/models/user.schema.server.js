module.exports = function(mongoose) {
    var RecommendSchema = require("./recommend.schema.server.js")(mongoose);
    
    var ProjectUserSchema = mongoose.Schema({
        username: {type: String, unique: true},
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        roles: [String],
        region: String,
        flair1: String,
        flair2: String,
        flair3: String,
        media: String,
        beacon: String,
        industry: String,
        organization: String,
        imageUrl: String,
        recommends: [RecommendSchema],
        connections: [mongoose.Schema.Types.ObjectId]
    }, {collection: 'project-user'});


    return ProjectUserSchema;
};
