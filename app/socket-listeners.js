import {socket, join} from './actionCreators/chat-actions';

export default store => {
	socket.on('USER_JOIN', data => {
		store.dispatch({
			type: 'USER_JOIN',
			data: data
		});
	});

	socket.on('USER_LEAVE', data => {
		store.dispatch({
			type: 'USER_LEAVE',
			data: data
		});
	});

	socket.on('MESSAGE_SEND', data => {
		store.dispatch({
			type: 'MESSAGE_SEND',
			data: data
		});
	});

	socket.on('MESSAGE_CHANGE', data => {
		store.dispatch({
			type: 'MESSAGE_CHANGE',
			data: data
		});
	});

	socket.on('VISIBILITY_CHANGE', data => {
		store.dispatch({
			type: 'VISIBILITY_CHANGE',
			data: data
		});
	});

	socket.on('reconnect', () => {
		var state = store.getState();
		if (state.chat.room && state.chat.username) {
			store.dispatch(join(state.chat.room, state.chat.username));
		}
	});
	return next => action => next(action);
};
