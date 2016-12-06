const defaultState = {
	room: '',
	username: '',
	users: [],
	history: [], // {user: string, message: string}
	current: [] // {user: string, message: string}
};

export default function (state = defaultState, action) {
	switch (action.type) {
		case 'SELF_JOIN':
			return Object.assign({}, state, {
				room: action.data.room,
				username: action.data.username,
				users: action.data.users
			});
		case 'USER_JOIN':
			var users = state.users;
			users.push(action.data);
			return Object.assign({}, state, {
				users: users,
				history: [...state.history, {message: `${action.data} has joined the room`}]
			});
		case 'USER_LEAVE':
			var newUsers = state.users.filter(function (elem) {
				return elem !== action.data;
			});
			var newCurrent = state.current.filter(function (elem) {
				return elem.user !== action.data;
			});
			return Object.assign({}, state, {
				users: newUsers,
				current: newCurrent,
				history: [...state.history, {message: `${action.data} has heft the room`}]
			});
		case 'MESSAGE_SEND':
			return Object.assign({}, state, {
				current: state.current.filter(elem => {
					return elem.user !== action.data.user;
				}),
				history: [...state.history, action.data]
			});
		case 'MESSAGE_CHANGE':
			var isIncluded = false;
			var changeCurrent = state.current.map(elem => {
				if (elem.user === action.data.user) {
					isIncluded = true;
					return Object.assign({}, elem, {
						message: action.data.message
					});
				}
				return elem;
			});
			if (!isIncluded) {
				changeCurrent.push(action.data);
			}
			return Object.assign({}, state, {
				current: changeCurrent
			});
		default:
			return state;
	}
}
