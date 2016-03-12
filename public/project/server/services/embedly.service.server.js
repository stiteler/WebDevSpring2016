// example code
module.exports = function(app, request) {
    console.log('loading embedly service');
    app.get("/api/project/embed/:media", generateEmbed);
    var api_key = process.env.EMBEDLY_API_KEY;

    function generateEmbed(req, res) {
        // media should be escaped already client side
        var media = req.params.media;
        console.log('embed request, media: ' + media);

        if(media) {
            var host = 'https://api.embed.ly'
            var path = '/1/oembed';
            var params = '?key=' + api_key + '&url=' + media;
            var api_call = host + path + params;

            // var options = {
            //     host: 'https://api.embed.ly',
            //     port: 80,
            //     path: path + params,
            //     method: 'GET'
            // }

            // var req = https.request(options, function(response) {
            //     console.log(response);
            // }).on('error', function(err) {
            //     console.log(err);
            // })
            // req.end();
            // console.log(api_call);

            // https.request(options, function(res) {
            //     console.log(res);
            // })
            // .on('error', function(err) {
            //     console.log(err);
            // });

            // var body = [];
            // https.get(api_call)
            //     .on('data', function(chunk) {
            //         body.push(chunk);
            //     })
            //     .on('end', function() {
            //         body = Buffer.concat(body).toString();
            //         res.send(body);
            //     })
            //     .on('error', function(error) {
            //         console.log(error);
            //     });

            request(api_call, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    res.send(body);
                } else {
                    res.status(400).send('Unable to generate embed.');
                }
            });
        }
    }
}
