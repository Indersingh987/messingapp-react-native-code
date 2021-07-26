/**
 * @format
 */

import React from 'react'
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import thunk from 'redux-thunk'
import reducers from './redux/reducers'

const middleware = [thunk]

const AppWrapper = () => {
    const store = createStore(reducers, composeWithDevTools(applyMiddleware(...middleware)));

    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => AppWrapper);
