/* global io */

const socket = io.connect('');

export function join(room, username) {
	return function (dispatch) {
		socket.emit('join', {
			room: room,
			username: username
		}, function (success) {
			if (success) {
				dispatch({
					type: 'JOIN',
					data: {
						room: room,
						username: username
					}
				});
			} else {
				console.log('join fail');
			}
		});
	};
}
