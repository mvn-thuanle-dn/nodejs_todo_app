var Task = require("../models/todoModel.js");
// var dd = require()

function getTasks(res) {
	Task.find(function(err, tasks) {
		if (err) {
			res.status(500).send(err);
		} else {
			res.json(tasks);
		}
	})
}

module.exports = function(app) {
	//get all task
	app.get("/api/tasks", function(req, res) {
		getTasks(res);
	}) 

	//show task by id
	app.get("/api/tasks/:id", function(req, res) {
		Task.findById({_id : req.params.id}, function(err, task){
			if (err) {
				throw err;
			} else {
				res.json(task);
			}
		});
	});

	/*
	 * Create a task
	 */
	app.post("/api/tasks", function(req, res) {
	 	var task = {
	 		text: req.body.text,
	 		isDone: req.body.status
	 	};

	 	Task.create(task, function(err, result) {
	 		if (err)
	 			throw err;
	 		console.log("Created a task");
	 		getTasks(res);
	 	});
	 });

	 /*
	  * Update a task 
	  */
	app.put("/api/tasks", function(req, res) {
		if (!req.body._id) {
			return res.status(500).send("ID is required");
		} else {
			Task.update({
				_id: req.body._id
			}, {
				text: req.body.text,
				isDone: req.body.status
			}, function(err, result) {
				if (err) {
					return res.status(500).json(err);
				}
				else {
					getTasks(res);
				}
			});
		}
	});

	/*
	 * Delete a task
	 */
	app.delete("/api/tasks/:id", function(req, res) {
		 Task.remove({
		 	_id: req.params.id
		 }, function(err, result) {
		 	if (err) {
		 		return res.status(500).json(err);
		 	} else {
		 		getTasks(res);
		 	}
		 });
	});
}
