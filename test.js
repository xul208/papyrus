var natural = require('natural'),
    TfIdf = natural.TfIdf,
    tfidf = new TfIdf();

tfidf.addDocument('We had an absolutely amazing time. Great location and the rooftop bar is to die for.');
tfidf.addDocument('this document is about ruby.');
tfidf.addDocument('this document is about ruby and node.');
tfidf.addDocument('this document is about node. it has node examples');

console.log('location --------------------------------');
tfidf.tfidfs('location', function(i, measure) {
        console.log('document #' + i + ' is ' + measure);
});

console.log('die --------------------------------');
tfidf.tfidfs('bar', function(i, measure) {
        console.log('document #' + i + ' is ' + measure);
});


