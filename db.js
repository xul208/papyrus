var redis = require('redis');
var client = redis.createClient();
client.on('connect', function() {
    console.log('connected');
});
client.set('framework', 'AngularJS');

client.get('2227897_0', function(err, reply) {
    console.log(reply);
});
