const defaultState = {
	room: '',
	username: ''
};

export default function (state = defaultState, action) {
	switch (action.type) {
		case 'JOIN':
			return action.data;
		default:
			return state;
	}
}
