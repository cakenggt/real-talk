/* global io */

import 'babel-polyfill'; // eslint-disable-line import/no-unassigned-import
import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import thunk from 'redux-thunk';
import ChatView from './components/chat-view.jsx';
import LoginView from './components/login-view.jsx';
import chatReducer from './reducers/chat-reducer';
import messageReducer from './reducers/message-reducer';

let socket = io();

var reducer = combineReducers({
	chat: chatReducer,
	message: messageReducer
});

var store = createStore(
	reducer,
	applyMiddleware(
		thunk,
		createSocketIoMiddleware(socket, 'server/')
	)
);

var mapStateToProps = state => {
	return {
		chat: state.chat,
		message: state.message
	};
};

var mapDispatchToProps = dispatch => {
	return {
		roomJoin: room => {
			dispatch({
				type: 'ROOM_JOIN',
				data: room
			});
		}
	};
};

var Index = connect(
	mapStateToProps,
	mapDispatchToProps
)(React.createClass({
	propTypes: {
		chat: React.PropTypes.shape({
			room: React.PropTypes.string,
			username: React.PropTypes.string
		}),
		message: React.PropTypes.string,
		roomJoin: React.PropTypes.func,
		params: React.PropTypes.shape({
			roomName: React.PropTypes.string
		})
	},
	componentWillMount: function () {
		if (this.props.params.roomName) {
			this.props.roomJoin(this.props.params.roomName);
		}
	},
	render: function () {
		var view = this.props.chat.username ? <ChatView/> : <LoginView/>;
		return (
			<div
				style={{
					minWidth: '600px',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					fontFamily: 'Domine, serif'
				}}
				>
				<h1
					style={{
						fontFamily: 'Special Elite, cursive',
						textAlign: 'center',
						flex: '0'
					}}
					>Real Talk</h1>
				<div>{this.props.message}</div>
				<div
					style={{
						flex: '1',
						display: 'flex'
					}}
					>
					{view}
				</div>
			</div>
		);
	}
}));

var router = (
	<Router history={browserHistory}>
		<Route path="/(room/:roomName)" >
			<IndexRoute component={Index}/>
		</Route>
	</Router>
);

render(
	<Provider store={store}>{router}</Provider>,
	document.getElementById('app')
);
