export function join(room, username) {
	return function (dispatch) {
		dispatch({
			type: 'server/JOIN',
			data: {
				room: room,
				username: username
			}
		});
	};
}

export function sendChange(message) {
	return function (dispatch) {
		dispatch({
			type: 'server/MESSAGE_CHANGE',
			data: message
		});
	};
}

export function sendMessage(message) {
	return function (dispatch, getState) {
		var state = getState();
		dispatch({
			type: 'server/MESSAGE_SEND',
			data: message
		});
		dispatch({
			type: 'MESSAGE_SEND',
			data: {
				user: state.chat.username,
				message: message
			}
		});
	};
}
