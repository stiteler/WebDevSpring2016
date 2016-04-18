module.exports = function(mongoose) {
    var EventSchema = mongoose.Schema({
        timestamp: Date,
        action: String,
        userA: mongoose.Schema.Types.ObjectId,
        userB: mongoose.Schema.Types.ObjectId,
    }, {collection: 'project-event'});

    return EventSchema;
};