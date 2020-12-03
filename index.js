import React from 'react';
import App from './src/App';
import rootReducer from './src/redux/reducers/index';

import { registerRootComponent } from 'expo';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'


// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [thunk];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

function Index() {
    return (
        <Provider store={store}>

            <App />
        </Provider>
    )
}

export default registerRootComponent(Index);
