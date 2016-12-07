import React from 'react';
import {connect} from 'react-redux';
import {join} from '../actionCreators/chat-actions';

var LoginView = React.createClass({
	propTypes: {
		join: React.PropTypes.func
	},
	getInitialState: function () {
		return {
			room: '',
			username: ''
		};
	},
	render: function () {
		return (
			<div>
				<h2>Join Chat Room</h2>
				<div>
					<div>
						Room:
						<input
							onChange={this.createChangeHandler('room')}
							onKeyPress={this.handleKeyPress}
							/>
					</div>
					<div>
						Username:
						<input
							onChange={this.createChangeHandler('username')}
							onKeyPress={this.handleKeyPress}
							/>
					</div>
					<span
						onClick={this.handleJoin}
						>Join</span>
				</div>
			</div>
		);
	},
	handleJoin: function () {
		this.props.join(this.state.room, this.state.username);
	},
	handleKeyPress: function (e) {
		if (e.key === 'Enter') {
			this.props.join(this.state.room, this.state.username);
		}
	},
	createChangeHandler: function (attr) {
		return e => {
			var newState = {};
			newState[attr] = e.target.value;
			this.setState(newState);
		};
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
