// server.js
// load the things we need
var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

function WordInfo(crossline, synsetOffset, pos, lemma, synonyms, gloss){
// assign values to object
  this.synsetOffset = synsetOffset;
  this.crossline = crossline;
  this.pos = pos;
  this.lemma = lemma;
  this.gloss = gloss;
  this.synonyms = synonyms;
} // function WordInfo()


var natural = require('natural');
var wordnet = new natural.WordNet('/usr/local/lib/node_modules/WNdb/dict');
var i = 0 ;
var wordnetDatas = [];

wordnet.lookup('network', function(results) {
    results.forEach(function(result) {
      var one_wordInfo = new WordInfo('------------------------------------',
      	                              result.synsetOffset, 
                                      result.pos,
                                      result.lemma,
                                      result.synonyms,
                                      result.gloss
      	                              );
      //json = one_wordInfo.toJSONString();
      //wordnetDatas[i] = JSON.parse(json);
      wordnetDatas[i]  = one_wordInfo;
      i++;
    });
  });

app.get('/',function(req,res){
    res.render('index', { title: 'NTNU Bioinformatics courses',
    	                  wordnetDatas: wordnetDatas });
    // -> render layout.ejs with index.ejs as `body`.
});

app.listen(8080);
console.log('8080 is the magic port');
