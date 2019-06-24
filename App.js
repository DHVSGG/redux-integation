import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './src/redux/reducers/rootReducer';
import MockScreen from './src/screens/MockScreen';

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

console.disableYellowBox = true;

class App extends Component {
  render() {
    return (
        <MockScreen />
    );
  }
}

const AppRedux = () => (
    <Provider store={store}>
        <App />
    </Provider>
)

export default AppRedux;