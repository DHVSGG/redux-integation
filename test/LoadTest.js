import React from 'react';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { GET_MESSAGE } from '../src/redux/Constants';
import { shallow } from 'enzyme';
import { getMessagesSuccess } from '../src/redux/actions/messageActions';
import { expect } from 'chai';
import messageReducer from '../src/redux/reducers/messageReducer';
import { Text } from 'react-native';
import MockScreenConnected, { MockScreen } from '../src/screens/MockScreen';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Redux basic test', () => {
    let wrapperConnected;
    let wrapper;
    it('messageActions test', () => {
        const expectedActions = [
            { type: GET_MESSAGE, payload: { '-Lhky1DM86uPKxuybVQt': 'Hola' } }
        ];
        const store = mockStore({ messages: {} });
        store.dispatch(getMessagesSuccess({ '-Lhky1DM86uPKxuybVQt': 'Hola' }));
        expect(store.getActions()).to.eql(expectedActions);
    });
    it('messageReducer test', () => {
        expect(messageReducer({ messages: {} }, {})).to.eql({
            messages: {}
        });
        expect(messageReducer({}, { type: GET_MESSAGE, payload: { '-Lhky1DM86uPKxuybVQt': 'Hola' } })).to.eql({
            messages: { '-Lhky1DM86uPKxuybVQt': 'Hola' }
        });
        expect(messageReducer({}, { type: GET_MESSAGE, payload: { '-Lhky1DM86uPKxuybVQt': 'Hola', 'Otro': 'Hola' } })).to.eql({
            messages: { '-Lhky1DM86uPKxuybVQt': 'Hola', 'Otro': 'Hola' }
        });
    });
    beforeEach(() => {
        const store = mockStore({ messageReducer: { messages: { '-Lhky1DM86uPKxuybVQt': 'Hola' } } });
        wrapperConnected = shallow(<MockScreenConnected store={store} />);
        wrapper = shallow(<MockScreen getMessage={() => Promise.resolve()} messages={{ '-Lhky1DM86uPKxuybVQt': 'Hola' }} />);
    });
    it('Connected component to redux test', () => {
        console.log(wrapperConnected.props().children.props.store.getState());
    });
    it('Only component render test', () => {
        expect(wrapper.find(Text)).to.have.lengthOf(2);
    });
});