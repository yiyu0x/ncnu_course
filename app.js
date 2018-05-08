const express = require('express');
const app = express();

var config = require('./config.js')[app.get('env')];
var port = config.port // production mode will return 3001

var quary_exec = require('./quary_exec');

app.use(express.static('public'));

//var port = 3000; //on local testing
app.listen(port,function(){
	console.log("server start");
	//console.log("http://127.0.0.1:3000");
	
	if(app.get('env') == 'development'){
		console.log('This environment is for development : ');
		console.log("http://127.0.0.1:3000");
		console.log('you can use \'NODE_ENV=production node app.js\' to change');
	}else{
		console.log('This environment is for production : ');
		console.log('you can use \'NODE_ENV=develop node app.js\' to change');
	}

});

app.set('view engine', 'ejs');

app.get('/', function(req,res){

});
// app.get('/', function(req, res){
// 	res.render('index.ejs');
// });
app.get('/search',function(req,res){
	let sql_quary = "SELECT * FROM ncnu_info where ";
	// app.use(express.static('public'));
	if (req.query.faculty == "不指定"){
		req.query.faculty = "%";
	}
	if (req.query.department == "不指定"){
		req.query.department = "%";
	}
	if (req.query.credit  == "不指定"){
		req.query.credit  = "%";
	}
	if (req.query.division == "不指定"){
		req.query.division = "%";
	}
	if (req.query.location == "不指定"){
		req.query.location = "%";
	}
	user_faculty       = "'" + req.query.faculty       +"'";
	user_department    = "'" + req.query.department    +"'";
	user_course_credit = "'" + req.query.credit        +"'";
	user_division      = "'" + req.query.division      +"'";
	user_location      = "'" + req.query.location      +"'";

   	sql_quary += "faculty like "       + user_faculty          + " and " +
				 "department like "    + user_department       + " and " +
				 "division like "      + user_division         + " and " +
				 "course_credit like " + user_course_credit    + " and " +
				 "location like "      + user_location         + ";";

	console.log("sql_quary : " + sql_quary);
	quary_exec.searchDB(sql_quary,function(records){
		console.log('in searchDB');
		console.log('---------------------------');
		res.render('index.ejs',{items:records});
    });

})






