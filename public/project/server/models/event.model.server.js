module.exports = function(Event) {
   
    var api = {
    	getMostRecent: getMostRecent
    	addEvent: addEvent
    };
    return api;

    function getMostRecent(n) {
    	return Event.find().sort({'-timestamp'}).limit(n);
    }

    function addEvent(event) {
    	Event.create(event);
    }

    // no delete
    // no update, intentional.
};
