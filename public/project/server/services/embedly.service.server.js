// example code
module.exports = function(app, request) {
    app.get("/api/project/embed/:media", generateEmbed);
    var api_key = process.env.EMBEDLY_API_KEY;

    function generateEmbed(req, res) {
        // media should be escaped already client side
        var media = req.params.media;
        console.log('media: ' + media);

        if(media) {
            var base = 'https://api.embed.ly/1/oembed';
            var params = '?key=' + api_key + '&url=' + media;
            var api_call = base + params;

            request(api_call, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body);
                    res.send(body);
                } else {
                    res.status(400).send('Unable to generate embed.');
                }
            });
        }
    }
}
