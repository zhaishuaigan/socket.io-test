var jwt = require('jsonwebtoken');
var users = {};

class Socket{

	run (io, config) {
		console.log('socket run');
		io.on('connection', function(socket) {
			console.log('user connect: ' + socket.id);
			socket.on('ping', function (message) {
				socket.emit('ping', message);
			});

			socket.on('login', function (token) {
				try {
					console.log(token);
					var user = jwt.verify(token, config.sign_key);
					socket.uid = user.uid;
					user.socket_id = socket.id;
					if (users[user.id] ) {
						io.to(users[user.id]).emit('');
					}
					users[user.uid] = user;
					socket.emit('login', user);
				} catch(err) {
					console.log('token error');
				}
			});

			socket.on('set-user-info', function (user) {
				socket.user = user;
			});

			socket.on('private-message', function (to, message) {
				if (users[to]) {
					io.to(users[to].socket_id).emit('private-message', users[to], message);
				}
			});

			socket.on('group-message', function (to, message) {
				io.to(to).emit(message);
			});

			socket.on('system-message', function (message) {
				io.emit('system-message', message);
			});

			socket.on('pull-private-message', function (uid) {

			});

			socket.on('pull-group-message', function (gid) {

			});

			socket.on('pull-system-message', function (sid) {

			});
			socket.emit('connect-success', 'hello');
		});
	}
}

module.exports = new Socket();