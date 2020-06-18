var Task = require("../models/todoModel");

module.exports = function(app) {
	app.get("/api/tasks/add", function(req, res) {
		//migrate seeding data
		var data = [
			{
				text: "create task in nodejs",
				isDone: false
			},
			{
				text: "show task in nodejs",
				isDone: false
			},
			{
				text: "update task in nodejs",
				isDone: false
			},
			{
				text: "delete task in nodejs",
				isDone: false
			}
		];

		Task.create(data, function(err, results) {
			if (err) throw err;
			res.send(results);
		});
	});
}