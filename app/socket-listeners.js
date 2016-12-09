import {socket} from './actionCreators/chat-actions';

export default function (dispatch) {
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
}
