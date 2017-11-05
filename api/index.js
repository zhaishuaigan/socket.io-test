var user = require('./user.js');

class Api{
	run (app) {
		console.log('api run');

        app.get('/user', user.index);
        app.post('/user/login', user.login);
	}
}

module.exports = new Api();