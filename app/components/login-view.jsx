import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {join} from '../actionCreators/chat-actions';

var LoginView = withRouter(React.createClass({
	propTypes: {
		join: React.PropTypes.func,
		room: React.PropTypes.string,
		router: React.PropTypes.object
	},
	getInitialState: function () {
		return {
			room: '',
			username: ''
		};
	},
	render: function () {
		var roomInput = this.props.room ? null : (
			<input
				onChange={this.createChangeHandler('room')}
				onKeyPress={this.handleKeyPress}
				style={{
					textAlign: 'center'
				}}
				placeholder={'Room'}
				autoFocus
				/>
		);
		return (
			<div
				className={'large-flex'}
				style={{
					justifyContent: 'center',
					alignItems: 'center'
				}}
				>
				<div
					className={'bordered'}
					style={{
						textAlign: 'center'
					}}
					>
					<h2>Join Chat Room</h2>
					<div>
						<div>
							{roomInput}
						</div>
						<div>
							<input
								onChange={this.createChangeHandler('username')}
								onKeyPress={this.handleKeyPress}
								style={{
									textAlign: 'center'
								}}
								placeholder={'Username'}
								autoFocus={Boolean(this.props.room)}
								/>
						</div>
						<span
							className={'btn'}
							onClick={this.handleJoin}
							>Join</span>
					</div>
				</div>
			</div>
		);
	},
	handleJoin: function () {
		this.join(this.state.room || this.props.room, this.state.username);
	},
	handleKeyPress: function (e) {
		if (e.key === 'Enter') {
			this.join(this.state.room || this.props.room, this.state.username);
		}
	},
	join: function (room, username) {
		this.props.join(room, username);
		this.props.router.replace('/room/' + room);
	},
	createChangeHandler: function (attr) {
		return e => {
			var newState = {};
			newState[attr] = e.target.value;
			this.setState(newState);
		};
	}
}));

var mapStateToProps = state => {
	return {
		room: state.chat.room
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
)(LoginView);
