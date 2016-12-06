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

		socket.on('action', action => {
			if (action.type === 'server/JOIN') {
				var room = action.data.room;
				var username = action.data.username;
				var roomSet = roomMap[room];
				if (room && (!roomSet || !roomSet.has(username))) {
					if (!roomSet) {
						roomSet = new Set();
						roomMap[room] = roomSet;
					}
					roomName = room;
					userName = username;
					socket.emit('action', {
						type: 'SELF_JOIN',
						data: {
							room: room,
							username: username,
							users: Array.from(roomSet)
						}
					});
					roomSet.add(username);
					socket.join(room);
					socket.broadcast.to(room).emit('action', {
						type: 'USER_JOIN',
						data: username
					});
				} else {
					socket.emit('action', {
						type: 'SELF_JOIN',
						data: {
							room: '',
							username: '',
							users: []
						}
					});
				}
			} else if (action.type === 'server/MESSAGE_CHANGE') {
				socket.broadcast.to(roomName).emit('action', {
					type: 'MESSAGE_CHANGE',
					data: {
						user: userName,
						message: action.data
					}
				});
			} else if (action.type === 'server/MESSAGE_SEND') {
				socket.broadcast.to(roomName).emit('action', {
					type: 'MESSAGE_SEND',
					data: {
						user: userName,
						message: action.data
					}
				});
			}
		});

		socket.on('disconnect', function () {
			var roomSet = roomMap[roomName];
			if (roomSet) {
				roomSet.delete(userName);
				socket.broadcast.to(roomName).emit('action', {
					type: 'USER_LEAVE',
					data: userName
				});
				if (!roomSet.size) {
					delete roomMap[roomName];
				}
			}
		});
	});
};
