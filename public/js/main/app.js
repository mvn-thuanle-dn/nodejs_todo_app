var app = angular.module("app.tasksManager", ["xeditable"]);

app.controller("thuanController", ['$scope', 'svTaskManager', function($scope, svTaskManager, $timeout) {
	$scope.appName = "Dashboard Task Manager";
	$scope.formData = {};
	$scope.tasks = [];
	$scope.loading = true;

	$scope.showData = function() {
		svTaskManager.getTask().then(function(data) {
				$scope.tasks = data.data;
				$scope.loading = false;
		});
	};

	$scope.showData();

	$scope.createTask = function() {
		var task = {
			text: $scope.formData.text,
			isDone: false
		}

		svTaskManager.add(task).then(function(data) {
			$scope.tasks = data.data;
			$scope.formData.text = "";
		});

	};
	
	$scope.updateTask = function(task) {
		console.log("update task", task);
		$scope.loading = true;

		svTaskManager.edit(task).then(function(data) {
			$scope.tasks = data.data;
			$scope.loading = false;
		});
	};

	$scope.removeTask = function(task) {
		console.log("delete task", task);
		$scope.loading = true;

		svTaskManager.remove(task._id).then(function(data) {
			$scope.tasks = data.data;
			$scope.loading = false;
		});
	};

}]);