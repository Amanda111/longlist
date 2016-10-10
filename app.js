// var express = require('express');
// var app = express();
// app.get('/api', function (req, res) {
//   res.header('Access-Control-Allow-Origin', '*');
//   // var arr = new Array()
//   // for(var i = 0;i < 5;i++){
//   // 	var x = Math.floor(Math.random() * 1e6);
//   // 	arr.push({text:x})
//   // }
//   var x = Math.floor(Math.random() * 1e6);
//   res.send(x);
// });

// app.listen(8080, function () {
//   console.log('Example app listening on port 8080!');
// });


var express = require('express');
var app = express();
app.get('/api', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	// console.log(req.query.count);
	var arr = new Array;
	for(var i = 0; i< req.query.count;i++){
		var x = Math.floor(Math.random() * 1e6);
		arr.push(x)
	}
	var arr_json = JSON.stringify(arr);
	res.json(arr);
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});