/* global io */
import {browserHistory} from 'react-router';

export const socket = io();

export function join(room, username) {
	return function (dispatch) {
		socket.emit('JOIN', {
			room: room,
			username: username
		}, (error, users) => {
			if (!error) {
				dispatch({
					type: 'SELF_JOIN',
					data: {
						room: room,
						username: username,
						users: users
					}
				});
				browserHistory.replace('/room/' + room);
				dispatch({
					type: 'MESSAGE',
					data: ''
				});
			} else {
				dispatch({
					type: 'SELF_JOIN',
					data: {
						users: []
					}
				});
				dispatch({
					type: 'MESSAGE',
					data: error
				});
			}
		});
	};
}

export function sendChange(message) {
	return function () {
		socket.emit('MESSAGE_CHANGE', message);
	};
}

export function sendMessage(message) {
	return function (dispatch, getState) {
		var state = getState();
		socket.emit('MESSAGE_SEND', message);
		dispatch({
			type: 'MESSAGE_SEND',
			data: {
				user: state.chat.username,
				message: message
			}
		});
	};
}

export function sendVisibilityChange(hidden) {
	return function () {
		socket.emit('VISIBILITY_CHANGE', hidden);
	};
}
