import React from 'react';
import {connect} from 'react-redux';
import {join} from '../actionCreators/chat-actions';

var ChatView = React.createClass({
	render: function () {
		return null;
	}
});

var mapStateToProps = state => {
	return {
		chat: state.chat
	};
};

var mapDispatchToProps = dispatch => {
	return {
		join: function (room, username) {
			dispatch(join(room, username));
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ChatView);
