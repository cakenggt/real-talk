import React from 'react';
import {connect} from 'react-redux';
import {join, sendChange, sendMessage} from '../actionCreators/chat-actions';

var ChatView = React.createClass({
	propTypes: {
		chat: React.PropTypes.shape({
			room: React.PropTypes.string,
			username: React.PropTypes.string,
			users: React.PropTypes.array,
			history: React.PropTypes.array
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
					style={{
						padding: '2px'
					}}
					>
					{elem.user} <i>{elem.message}</i>
				</div>
			);
		});
		var history = this.props.chat.history.map(function (elem, i) {
			var messageStyle = {
				padding: '2px'
			};
			if (!elem.user) {
				messageStyle.fontStyle = 'italic';
			}
			var username = elem.user ? elem.user + ' ' : '';
			return (
				<div
					key={i}
					style={messageStyle}
					>
					<strong>{username}</strong>{elem.message}
				</div>
			);
		});
		return (
			<div
				style={{
					display: 'flex',
					height: '100%'
				}}
				>
				<div
					style={{
						flex: '1',
						flexDirection: 'column',
						display: 'flex'
					}}
					>
					<div
						style={{
							border: '2px black solid',
							borderRadius: '3px',
							margin: '3px',
							padding: '3px',
							overflowY: 'auto',
							flex: '1'
						}}
						>
						{history}
					</div>
					<div
						style={{
							display: 'flex'
						}}
						>
						<input
							value={this.state.message}
							onKeyPress={this.handleKeyPress}
							onChange={this.handleChange}
							style={{
								display: 'block',
								border: '2px black solid',
								borderRadius: '3px',
								margin: '3px',
								flex: '1'
							}}
							autoFocus
							/>
						<span
							style={{
								backgroundColor: 'black',
								color: 'white',
								borderRadius: '3px',
								margin: '3px',
								padding: '3px'
							}}
							onClick={this.handleClick}
							>Send</span>
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
		if (e.key === 'Enter' && this.state.message) {
			this.sendMessage();
		}
	},
	handleClick: function () {
		if (this.state.message) {
			this.sendMessage();
		}
	},
	handleChange: function (e) {
		this.setState({
			message: e.target.value
		});
		this.props.sendChange(e.target.value);
	},
	sendMessage: function () {
		this.props.sendMessage(this.state.message);
		this.setState({
			message: ''
		});
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
