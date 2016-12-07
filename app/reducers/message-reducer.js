export default function (state = '', action) {
	switch (action.type) {
		case 'SELF_JOIN':
			if (!action.data.username && !action.data.room) {
				return 'This user already exists in the specified room';
			}
			return '';
		default:
			return state;
	}
}
