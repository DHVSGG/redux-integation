import { GET_MESSAGE } from "../Constants";
import { database } from "../../services/firebase/firebase";

export const addMessage = (payload) => {
    database.child('Message').push(payload);
}

export const getMessage = () => (dispatch) => {
    database.child('Message').on('value', (messages) => {
        dispatch(getMessagesSuccess(messages.val()));
    });
}

export const getMessagesSuccess = (payload) => {
    return {
        type: GET_MESSAGE,
        payload
    };
}