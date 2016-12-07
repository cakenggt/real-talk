const defaultState = {
	room: '',
	username: '',
	users: [], // {user: string, message: string}
	history: [] // {user: string, message: string}
};

const beepSound = new Audio('/audio/beep.mp3');
const keySounds = [
	new Audio('/audio/0.wav'),
	new Audio('/audio/1.wav'),
	new Audio('/audio/2.wav'),
	new Audio('/audio/3.wav'),
	new Audio('/audio/4.wav'),
	new Audio('/audio/5.wav'),
	new Audio('/audio/6.wav'),
	new Audio('/audio/7.wav'),
	new Audio('/audio/8.wav'),
	new Audio('/audio/9.wav')
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
				history: [...state.history, {message: `${action.data} has heft the room`}]
			});
		case 'MESSAGE_SEND':
			beepSound.play();
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
			var key = keySounds[Math.floor(Math.random() * keySounds.length)];
			console.log('playing');
			console.log(key);
			key.play();
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
