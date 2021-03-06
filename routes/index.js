var express = require('express');
var router = express.Router();
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// searching wordNet...
var userSearch = 'network';
var wordnetDatas = [];

function WordInfo(crossline, synsetOffset, pos, lemma, synonyms, gloss){
// assign values to object
  this.synsetOffset = synsetOffset;
  this.crossline = crossline;
  this.pos = pos;
  this.lemma = lemma;
  this.gloss = gloss;
  this.synonyms = synonyms;
} // function WordInfo()


function SearchingWordNet( userSearchString ) {
 console.log('start searching...');
  var natural = require('natural');
  var wordnet = new natural.WordNet('/usr/local/lib/node_modules/WNdb/dict');
  var i = 0 ;
  wordnetDatas = [];

  wordnet.lookup(String(userSearch), function(results) {
      results.forEach(function(result) {
        var one_wordInfo = new WordInfo(result.synsetOffset, 
                                        result.pos,
                                        result.lemma,
                                        result.synonyms,
                                        result.gloss
    	                                  );
        //json = one_wordInfo.toJSONString();
        //wordnetDatas[i] = JSON.parse(json);
        wordnetDatas[i]  = one_wordInfo;
        //wordnetDatas.push(one_wordInfo);
        i++;
      });
      return wordnetDatas;
  });
} // SearchingWordNet()
/*
router.post('/', function(req, res){
	userSearch = req.body.userSearchString;
    console.log(req.body.userSearchString);

    
    res.render('index', { title: 'NTNU Bioinformatics courses',
    	                  wordnetDatas: wordnetDatas });
});*/

SearchingWordNet('network');

/* GET home page. */
router.get('/',function(req,res){
	console.log('router.get: @index.js');
	SearchingWordNet(userSearch);
	console.log(userSearch);
	console.log(wordnetDatas);
    res.render('index', { title: 'NTNU Bioinformatics courses',
    	                  wordnetDatas: wordnetDatas,
    	                  targetStr : 'Please Enter the keyword you want to search...' });
    wordnetDatas = [];
});


module.exports = router;

