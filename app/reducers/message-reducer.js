export default function (state = '', action) {
	switch (action.type) {
		case 'MESSAGE':
			return action.data;
		default:
			return state;
	}
}
