var fs = require('fs');
var obj;
fs.readFile('result.json', 'utf8', function (err, data) {
      if (err) throw err;
      obj = JSON.parse(data);
    var redis = require('redis');
    var client = redis.createClient();
    client.on('connect', function() {
        console.log('connected');
    });
    
    for (var i in obj) {
     //   client.set(i, obj[i], function(err, reply){console.log(reply);});
     //   console.log(obj[i]);
        var result = obj[i].match( /[^\.!\?]+[\.!\?]+/g );
        for (var j = 0; result && j < result.length; j++) {
            client.set(i+'_'+j, result[j], function(err, reply){console.log(reply);});
            console.log(i+'_'+j);
        }
    } 
    console.log('finished');
});
