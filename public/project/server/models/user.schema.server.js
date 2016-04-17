module.exports = function(mongoose) {
    var RecommendSchema = require("./recommend.schema.server.js")(mongoose);
    var UserSchema = mongoose.Schema({
        username: {type: String, unique: true},
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        roles: [String] // recruiter || user
        region: String,
        flair1: String,
        flair2: String,
        media: String,
        beacon: String,
        industry: String,
        organization: String,
        imageUrl: String,
        recommends: [RecommendSchema],
        connections: [mongoose.Schema.Types.ObjectId]
    }, {collection: 'project-user'});


    return UserSchema;
};

// {  
//       "_id":123,
//       "firstName":"Alice",
//       "lastName":"Wunderland",
//       "username":"alice",
//       "password":"alice",
//       "roles":[  
//          "user"
//       ],
//       "email":"alice@wonderland.com",
//       "region":"wonderland",
//       "flair1":"magic",
//       "flair2":"riddles",
//       "flair3":"walking",
//       "media":"https://www.youtube.com/watch?v=WovwuOFBUuY",
//       "beacon":"networking",
//       "industry":"Entertainment",
//       "organization":"Yellow Brick Road, Inc.",
//       "imageUrl":"http://www.thewrap.com/wp-content/uploads/2013/11/JOHNNY-DEPP-ALICE-IN-WONDERLAND-6181.jpg",
//       "recommends": [
//          {
//             "recommenderId":120,
//             "recommendation": "magic",
//             "recommenderUsername": "c",
//             "blurb": "She's great at magic!",
//             "_id": 123
//          },
//          {
//             "recommenderId":124,
//             "recommendation": "walking",
//             "recommenderUsername": "don",
//             "blurb": "follows yellow roads",
//             "_id": 126
//          },
//          {
//             "recommenderId":125,
//             "recommendation": "magic",
//             "recommenderUsername": "bob",
//             "blurb": "brilliant patronus",
//             "_id": 129
//          }
//       ],
//    },