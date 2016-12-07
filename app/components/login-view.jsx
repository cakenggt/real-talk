import React from 'react';
import {connect} from 'react-redux';
import {join} from '../actionCreators/chat-actions';

var LoginView = React.createClass({
	propTypes: {
		join: React.PropTypes.func,
		room: React.PropTypes.string
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
					textAlign: 'center',
					border: '2px black solid',
					borderRadius: '3px',
					margin: '3px',
					fontFamily: 'Playfair Display, serif',
					fontSize: '16px'
				}}
				placeholder={'Room'}
				autoFocus
				/>
		);
		return (
			<div
				style={{
					display: 'flex',
					flex: '1',
					justifyContent: 'center',
					alignItems: 'center'
				}}
				>
				<div
					style={{
						border: '2px black solid',
						borderRadius: '3px',
						margin: '3px',
						padding: '3px',
						textAlign: 'center'
					}}
					>
					<h2
						style={{
							fontFamily: 'Special Elite, cursive',
							textAlign: 'center'
						}}
						>Join Chat Room</h2>
					<div>
						<div>
							{roomInput}
						</div>
						<div>
							<input
								onChange={this.createChangeHandler('username')}
								onKeyPress={this.handleKeyPress}
								style={{
									textAlign: 'center',
									border: '2px black solid',
									borderRadius: '3px',
									margin: '3px',
									fontFamily: 'Playfair Display, serif',
									fontSize: '16px'
								}}
								placeholder={'Username'}
								autoFocus={Boolean(this.props.room)}
								/>
						</div>
						<span
							style={{
								backgroundColor: 'black',
								color: 'white',
								borderRadius: '3px',
								margin: '3px',
								padding: '6px',
								display: 'inline-block'
							}}
							onClick={this.handleJoin}
							>Join</span>
					</div>
				</div>
			</div>
		);
	},
	handleJoin: function () {
		this.props.join(this.state.room || this.props.room, this.state.username);
	},
	handleKeyPress: function (e) {
		if (e.key === 'Enter') {
			this.props.join(this.state.room || this.props.room, this.state.username);
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
