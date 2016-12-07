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

let socket = io();

var reducer = combineReducers({
	chat: chatReducer
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
		chat: state.chat
	};
};

var Index = connect(
	mapStateToProps
)(React.createClass({
	propTypes: {
		chat: React.PropTypes.shape({
			room: React.PropTypes.string
		})
	},
	render: function () {
		var view = this.props.chat.room ? <ChatView/> : <LoginView/>;
		return (
			<div
				style={{
					minWidth: '600px',
					height: '100%'
				}}
				>
				{view}
			</div>
		);
	}
}));

var router = (
	<Router history={browserHistory}>
		<Route path="/" >
			<IndexRoute component={Index}/>
		</Route>
	</Router>
);

render(
	<Provider store={store}>{router}</Provider>,
	document.getElementById('app')
);
