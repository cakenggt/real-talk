const defaultState = {
	room: '',
	username: '',
	users: [], // {user: string, message: string}
	history: [] // {user: string, message: string}
};

const enterSound = new Audio('/audio/enter.wav');
const keySounds = [
	new Audio('/audio/key01.wav'),
	new Audio('/audio/key02.wav'),
	new Audio('/audio/key03.wav'),
	new Audio('/audio/key04.wav'),
	new Audio('/audio/key05.wav'),
	new Audio('/audio/key06.wav')
];

export default function (state = defaultState, action) {
	switch (action.type) {
		case 'SELF_JOIN':
			return Object.assign({}, state, {
				room: action.data.room || state.room,
				username: action.data.username,
				users: action.data.users.map(elem => {
					return {
						user: elem,
						message: ''
					};
				})
			});
		case 'ROOM_JOIN':
			return Object.assign({}, state, {
				room: action.data
			});
		case 'USER_JOIN':
			var users = state.users;
			users.push({
				user: action.data,
				message: ''
			});
			return Object.assign({}, state, {
				users: users,
				history: [...state.history, {message: `${action.data} has joined the room`}]
			});
		case 'USER_LEAVE':
			var newUsers = state.users.filter(elem => {
				return elem.user !== action.data;
			});
			return Object.assign({}, state, {
				users: newUsers,
				history: [...state.history, {message: `${action.data} has left the room`}]
			});
		case 'MESSAGE_SEND':
			enterSound.play();
			return Object.assign({}, state, {
				users: state.users.map(elem => {
					if (elem.user === action.data.user) {
						return Object.assign({}, elem, {
							message: ''
						});
					}
					return elem;
				}),
				history: [...state.history, action.data]
			});
		case 'MESSAGE_CHANGE':
			if (!document.hidden) {
				var key = keySounds[Math.floor(Math.random() * keySounds.length)];
				key.play();
			}
			return Object.assign({}, state, {
				users: state.users.map(elem => {
					if (elem.user === action.data.user) {
						return Object.assign({}, elem, {
							message: action.data.message
						});
					}
					return elem;
				})
			});
		default:
			return state;
	}
}
