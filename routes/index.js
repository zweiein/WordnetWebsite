var express = require('express')
  , partials = require('express-partials')
  , app = express();

// load the express-partials middleware
app.use(partials());

app.get('/',function(req,res,next){
  res.render('index.ejs') 
  // -> render layout.ejs with index.ejs as `body`.
})

