import { CHAT_NEW_CONVERSATION } from '../actions/actionTypes';

const initialState = {
  data: null
};

const conversationReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHAT_NEW_CONVERSATION:
      return { data: action.user };
    default:
      return state;
  }
};

export default conversationReducer;
