var app = angular.module("app.tasksManager");

app.factory("svTaskManager", ["$http", function($http) {
	return {
		getTask: function() {
			return $http.get("/api/tasks");
		},
		add: function(data) {
			return $http.post("/api/tasks", data);
		},
		edit: function(data) {
			return $http.put("/api/tasks", data);
		},
		remove: function(id) {
			return $http.delete("/api/tasks/" + id);
		}
	}
}]);