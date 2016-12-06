import React from 'react';
import {connect} from 'react-redux';
import {join, sendChange, sendMessage} from '../actionCreators/chat-actions';

var ChatView = React.createClass({
	propTypes: {
		chat: React.PropTypes.shape({
			room: React.PropTypes.string,
			username: React.PropTypes.string,
			users: React.PropTypes.array,
			history: React.PropTypes.array,
			current: React.PropTypes.array
		}),
		sendChange: React.PropTypes.func,
		sendMessage: React.PropTypes.func
	},
	getInitialState: function () {
		return {
			message: ''
		};
	},
	render: function () {
		var users = this.props.chat.users.map(function (elem, i) {
			return (
				<div
					key={i}
					>
					{elem}
				</div>
			);
		});
		var history = this.props.chat.history.map(function (elem, i) {
			var messageStyle = {};
			if (!elem.user) {
				messageStyle.fontStyle = 'italic';
			}
			return (
				<div
					key={i}
					>
					<span
						style={{
							fontStyle: 'bold'
						}}
						>
						{elem.user}
					</span>
					<span
						style={messageStyle}
						>
						{elem.message}
					</span>
				</div>
			);
		});
		var current = this.props.chat.current.map(function (elem, i) {
			return (
				<div
					key={i}
					>
					<div>
						{elem.user}
					</div>
					<div>
						{elem.message}
					</div>
				</div>
			);
		});
		return (
			<div
				style={{
					display: 'flex'
				}}
				>

				<div
					style={{
						flex: '1',
						border: '2px black solid',
						borderRadius: '3px',
						margin: '3px',
						padding: '3px'
					}}
					>
					<div>
						<h2>History</h2>
						<div>
							{history}
						</div>
					</div>
					<div>
						text goes here
						<input
							value={this.state.message}
							onKeyPress={this.handleKeyPress}
							onChange={this.handleChange}
							/>
					</div>
					<div>
						<h2>Current</h2>
						<div>
							{current}
						</div>
					</div>
				</div>
				<div
					style={{
						flex: '0 0 20%',
						border: '2px black solid',
						borderRadius: '3px',
						margin: '3px',
						padding: '3px'
					}}
					>
					<h2>Users</h2>
					<div>
						{users}
					</div>
				</div>
			</div>
		);
	},
	handleKeyPress: function (e) {
		if (e.key === 'Enter') {
			this.props.sendMessage(this.state.message);
			this.setState({
				message: ''
			});
		}
	},
	handleChange: function (e) {
		this.setState({
			message: e.target.value
		});
		this.props.sendChange(e.target.value);
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
		},
		sendChange: function (message) {
			dispatch(sendChange(message));
		},
		sendMessage: function (message) {
			dispatch(sendMessage(message));
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ChatView);
