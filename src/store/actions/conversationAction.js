import { CHAT_NEW_CONVERSATION } from './actionTypes';

const conversationDispatch = user => ({ type: CHAT_NEW_CONVERSATION, user });

const dispatchConversation = user => {
  return dispatch => {
    return dispatch(conversationDispatch(user));
  };
};

export default dispatchConversation;
