import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducers'
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const enhancer = composeEnhancers(
  applyMiddleware(thunk)
)

const store = createStore(
  reducer,
  enhancer
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'))
registerServiceWorker()
