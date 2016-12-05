import React from 'react';
import {connect} from 'react-redux';
import {join} from '../actionCreators/chat-actions';

var LoginView = React.createClass({
	propTypes: {
		join: React.PropTypes.func
	},
	render: function () {
		return (
			<div>
				<span
					onClick={this.handleJoin}
					>here</span>
			</div>
		);
	},
	handleJoin: function () {
		this.props.join('test', 'tester');
	}
});

var mapDispatchToProps = dispatch => {
	return {
		join: function (room, username) {
			dispatch(join(room, username));
		}
	};
};

export default connect(
	null,
	mapDispatchToProps
)(LoginView);
