var express             = require("express");
var bodyParser          = require("body-parser");
var morgan              = require("morgan");
var mongoose            = require("mongoose");
var displayRoutes       = require('express-routemap');

//db config
var config     = require("./config");

//setupController 
var seeding    = require("./api/controllers/setupController");
//taskController
var tasks 	   = require("./api/controllers/taskController");

//env
var app  = express();
var port = process.env.PORT || 3000;

//config middleware
//config public static file
app.use("/assets", express.static(__dirname + "/public"));

//using json 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

//track log in terminal 
app.use(morgan("dev"));

//config template engine
app.set("view engine", "ejs");

//db info
// console.log(config.getDbConnectionString());
mongoose.connect(config.getDbConnectionString());

//create seeding data from controllers
// seeding(app);
tasks(app);
//config route
app.get("/", function(req, res) {
	res.render("index");
});

//config port listen
app.listen(port, function(err) {
	if (err) throw err;
	console.log(`App listening on port ${port}`);
	displayRoutes(app);
});
