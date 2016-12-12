import React from 'react';
import {connect} from 'react-redux';
import {join, sendChange, sendMessage} from '../actionCreators/chat-actions';

var ChatView = React.createClass({
	propTypes: {
		chat: React.PropTypes.shape({
			room: React.PropTypes.string.isRequired,
			username: React.PropTypes.string,
			users: React.PropTypes.array,
			history: React.PropTypes.array
		}).isRequired,
		sendChange: React.PropTypes.func,
		sendMessage: React.PropTypes.func
	},
	getInitialState: function () {
		return {
			message: ''
		};
	},
	componentDidMount: function () {
		document.title = 'Real Talk: ' + this.props.chat.room;
	},
	componentDidUpdate: function(prevProps) {
		if (this.props.chat.history.length > prevProps.chat.history.length){
			var historyElement = document.querySelector('#history');
			var scrollHeight = historyElement.scrollHeight;
			var totalScrollHeight = scrollHeight - historyElement.clientHeight;
			var scrolled = historyElement.scrollTop;
			if (totalScrollHeight - scrolled < 50){
				// if within 50 px of bottom, scroll down
				historyElement.scrollTop = totalScrollHeight;
			}
		}
	},
	render: function () {
		var users = this.props.chat.users.map(function (elem, i) {
			var userStyle = {
				marginRight: '2px'
			};
			userStyle.textDecoration = elem.hidden ? 'line-through' : 'none';
			return (
				<div
					key={i}
					style={{
						padding: '2px'
					}}
					>
					<span
						style={userStyle}
						>
						{elem.user}
					</span>
					<i>{elem.message}</i>
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
				className={'large-flex'}
				style={{
					flexDirection: 'column'
				}}
				>
				<h2>Room: {this.props.chat.room}</h2>
				<div
					className={'large-flex'}
					>
					<div
						className={'large-flex'}
						style={{
							flexDirection: 'column'
						}}
						id={'chat-window'}
						>
						<div
							className={'bordered'}
							style={{
								overflowY: 'auto',
								flex: '1',
								wordBreak: 'break-word'
							}}
							id={'history'}
							>
							{history}
						</div>
						<div
							className={'small-flex'}
							>
							<input
								value={this.state.message}
								onKeyPress={this.handleKeyPress}
								onChange={this.handleChange}
								style={{
									flex: '1'
								}}
								autoFocus
								/>
							<span
								className={'btn'}
								onClick={this.handleClick}
								>Send</span>
						</div>
					</div>
					<div
						className={'bordered large-flex'}
						style={{
							flex: '0 0 20%',
							wordBreak: 'break-word',
							flexDirection: 'column'
						}}
						id={'user-list'}
						>
						<h2>Users</h2>
						<div
							style={{
								overflowY: 'auto'
							}}>
							{users}
						</div>
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
