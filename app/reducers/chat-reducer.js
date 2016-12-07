const defaultState = {
	room: '',
	username: '',
	users: [], // {user: string, message: string}
	history: [] // {user: string, message: string}
};

export default function (state = defaultState, action) {
	switch (action.type) {
		case 'SELF_JOIN':
			return Object.assign({}, state, {
				room: action.data.room,
				username: action.data.username,
				users: action.data.users.map(elem => {
					return {
						user: elem,
						message: ''
					};
				})
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
