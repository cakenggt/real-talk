'use strict';

module.exports = function (options) {
	// This is your express app object
	let app = options.app;

	// This is the io object that we will listen for connections to
	const io = require('socket.io')(app);

	const roomMap = {};

	io.on('connection', function (socket) {
		var roomName;
		var username;

		socket.on('join', function (data, fn) {
			var room = data.room;
			username = data.username;
			if (roomMap[room]) {
				var roomSet = roomMap[room];
				if (roomSet.has(username)) {
					fn(false);
				} else {
					roomSet.add(username);
					roomName = room;
					fn(true);
					socket.join(room);
				}
			} else {
				roomMap[room] = new Set(username);
				socket.join(room);
				roomName = room;
				fn(true);
			}
		});

		socket.on('disconnect', function () {
			if (roomMap[roomName]) {
				roomMap[roomName].delete(username);
			}
		});
	});
};
