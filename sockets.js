'use strict';

module.exports = function (options) {
	// This is your express app object
	let app = options.app;

	// This is the io object that we will listen for connections to
	const io = require('socket.io')(app);

	const roomMap = {};

	io.on('connection', function (socket) {
		var roomName;
		var userName;

		socket.on('JOIN', (data, fn) => {
			var room = data.room;
			var username = data.username;
			var roomSet = roomMap[room];
			if (room && (!roomSet || !roomSet.has(username))) {
				if (!roomSet) {
					roomSet = new Set();
					roomMap[room] = roomSet;
				}
				roomName = room;
				userName = username;
				fn(true, Array.from(roomSet));
				roomSet.add(username);
				socket.join(room);
				socket.broadcast.to(room).emit('USER_JOIN', username);
			} else {
				fn(false);
			}
		});

		socket.on('MESSAGE_CHANGE', data => {
			socket.broadcast.to(roomName).emit('MESSAGE_CHANGE', {
				user: userName,
				message: data
			});
		});

		socket.on('MESSAGE_SEND', data => {
			socket.broadcast.to(roomName).emit('MESSAGE_SEND', {
				user: userName,
				message: data
			});
		});

		socket.on('VISIBILITY_CHANGE', hidden => {
			socket.broadcast.to(roomName).emit('VISIBILITY_CHANGE', {
				user: userName,
				hidden: hidden
			});
		});

		socket.on('disconnect', function () {
			var roomSet = roomMap[roomName];
			if (roomSet) {
				roomSet.delete(userName);
				socket.broadcast.to(roomName).emit('USER_LEAVE', userName);
				if (!roomSet.size) {
					delete roomMap[roomName];
				}
			}
		});
	});
};
