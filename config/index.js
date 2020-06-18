var configValues = require("./config.json");

module.exports = {
	getDbConnectionString: function(err) {
		if (err) throw err;
		return `mongodb+srv://${configValues.username}:${configValues.password}@thuanlengoc-wdyol.mongodb.net/${configValues.db_name}?retryWrites=true&w=majority`
	}
}