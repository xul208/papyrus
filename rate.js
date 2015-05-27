// Rate each sentence with a pool of key words
var word_pool = 'sleep sleeping sleepless sleepness rest restful wake waking awake very bed night quiet noisy pillow mattress late midnight dream';
var redis = require('redis');
var client = redis.createClient();
// NLP libraries
var natural = require('natural'),
      TfIdf = natural.TfIdf,
      tfidf = new TfIdf();

// Rate with an array of keys
var rateByKeys = function(err, keyArray) {
    for (var i = 0; i < keyArray.length; ++i) {
        console.log(i);
        client.get(keyArray[i], function(err, reply) {
            tfidf.addDocument(reply); 
            //console.log(reply);
            var t = new TfIdf();
            t.addDocument(reply);
            t.tfidfs(word_pool, function(i,measure) {
                if (measure > 0.3){
                    console.log(reply, 'score: ', measure);
                }
            });
        });
    }
    console.log('=====================');
    tfidf.tfidfs(word_pool, function(documentIndex, measure) {
        console.log(documentIndex, measure);
    });
} 
// Rate a single sentence
var rateSingleSentence = function(sentence, documentIndex) {
    tfidf.addDocument(sentence);
}

// connect to redis
client.on('connect', function() {
    console.log('connected');
});

client.keys('*_*', function(err,reply){rateByKeys(err, reply)});

