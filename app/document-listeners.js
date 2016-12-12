import {sendVisibilityChange} from './actionCreators/chat-actions';

export default dispatch => {
	document.addEventListener('visibilitychange', function () {
		dispatch(sendVisibilityChange(document.hidden));
	})
}
