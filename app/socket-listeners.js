import {socket, join} from './actionCreators/chat-actions';

export default function (dispatch, getState) {
	socket.on('USER_JOIN', data => {
		dispatch({
			type: 'USER_JOIN',
			data: data
		});
	});

	socket.on('USER_LEAVE', data => {
		dispatch({
			type: 'USER_LEAVE',
			data: data
		});
	});

	socket.on('MESSAGE_SEND', data => {
		dispatch({
			type: 'MESSAGE_SEND',
			data: data
		});
	});

	socket.on('MESSAGE_CHANGE', data => {
		dispatch({
			type: 'MESSAGE_CHANGE',
			data: data
		});
	});

	socket.on('VISIBILITY_CHANGE', data => {
		dispatch({
			type: 'VISIBILITY_CHANGE',
			data: data
		});
	});

	socket.on('reconnect', () => {
		var state = getState();
		if (state.chat.room && state.chat.username) {
			dispatch(join(state.chat.room, state.chat.username));
		}
	});
}
