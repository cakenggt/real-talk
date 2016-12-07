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
			<div
				style={{
					display: 'flex',
					height: '100%',
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
					<h2>Join Chat Room</h2>
					<div>
						<div>
							<input
								onChange={this.createChangeHandler('room')}
								onKeyPress={this.handleKeyPress}
								style={{
									textAlign: 'center',
									border: '2px black solid',
									borderRadius: '3px',
									margin: '3px'
								}}
								placeholder={'Room'}
								/>
						</div>
						<div>
							<input
								onChange={this.createChangeHandler('username')}
								onKeyPress={this.handleKeyPress}
								style={{
									textAlign: 'center',
									border: '2px black solid',
									borderRadius: '3px',
									margin: '3px'
								}}
								placeholder={'Username'}
								/>
						</div>
						<span
							style={{
								backgroundColor: 'black',
								color: 'white',
								borderRadius: '3px',
								margin: '3px',
								padding: '3px',
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
