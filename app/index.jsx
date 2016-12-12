import 'babel-polyfill'; // eslint-disable-line import/no-unassigned-import
import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import ChatView from './components/chat-view.jsx';
import LoginView from './components/login-view.jsx';
import chatReducer from './reducers/chat-reducer';
import messageReducer from './reducers/message-reducer';
import addSocketListeners from './socket-listeners';
import addDocumentListeners from './document-listeners';

var reducer = combineReducers({
	chat: chatReducer,
	message: messageReducer
});

var store = createStore(
	reducer,
	applyMiddleware(
		thunk
	)
);

addSocketListeners(store.dispatch);

addDocumentListeners(store.dispatch);

var mapStateToProps = state => {
	return {
		chat: state.chat,
		message: state.message
	};
};

var Index = connect(
	mapStateToProps
)(React.createClass({
	propTypes: {
		message: React.PropTypes.string,
		children: React.PropTypes.object
	},
	render: function () {
		return (
			<div
				className={'container'}
				>
				<h1>Real Talk</h1>
				<div>{this.props.message}</div>
				<div
					className={'large-flex'}
					>
					{this.props.children}
				</div>
			</div>
		);
	}
}));

var checkLogin = (nextState, replace) => {
	var state = store.getState();
	if (!state.chat.username) {
		store.dispatch({
			type: 'ROOM_JOIN',
			data: nextState.params.roomName
		});
		replace('/');
	}
};

var router = (
	<Router history={browserHistory}>
		<Route path="/" component={Index}>
			<IndexRoute component={LoginView}/>
			<Route path="room/:roomName" component={ChatView} onEnter={checkLogin}/>
		</Route>
	</Router>
);

render(
	<Provider store={store}>{router}</Provider>,
	document.getElementById('app')
);
