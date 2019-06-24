import { GET_MESSAGE } from "../Constants";

const initialState = {
    messages: {}
};

function messageReducer(state = initialState, action) {
      switch (action.type) {
        case GET_MESSAGE:
            return { ...state, messages: action.payload };
        default:
            return state;
      }
};

export default messageReducer;