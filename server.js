var express = require('express');

// create app
var app = express();

app.use(express.static('admin/public'));

app.listen(3001, function(){
  console.log('express listening on port 3001 to the admin/public directory');
});
