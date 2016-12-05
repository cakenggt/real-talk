import 'babel-polyfill';
import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import dataReducer from './reducers/dataReducer.js';
import {loadData} from './actionCreators/dataActions.js';
var socket = io.connect('');

var reducer = combineReducers({
  data: dataReducer
});

var store = createStore(
  reducer,
  applyMiddleware(thunk)
);


var mapStateToProps = (state) => {
  return {
    data: state.data
  }
}

var mapDispatchToProps = (dispatch) => {
  return {
    loadData: function(newData){
      dispatch(loadData(newData));
    }
  }
}

var Index = connect(
  mapStateToProps,
  mapDispatchToProps
)(React.createClass({
  render: function() {
    return (
      <div></div>
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
