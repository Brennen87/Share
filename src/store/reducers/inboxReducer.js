import { METADATA } from '../../common/metadata';
import {
  FETCH_CHAT_LIST,
  FETCH_CONTACT_LIST,
  FETCH_MESSAGES,
  FETCH_PROJECT_CHAT_LIST,
  SET_CHAT_ID,
  WS_NEW_MESSAGE,
  WS_TYPING
} from '../actions/actionTypes';

const initialState = {
  selectedChatId: null,
  selectedChatIsClosed: false,
  chatList: { ...METADATA.default, data: null },
  projectChatList: { ...METADATA.default, data: null },
  messages: { ...METADATA.default, data: null },
  contactList: { ...METADATA.default, data: null }
};

const inboxReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CHAT_LIST.REQUEST:
      return { ...state, chatList: { ...state.chatList, ...METADATA.request } };
    case FETCH_CHAT_LIST.SUCCESS:
      return { ...state, chatList: { data: action.chatList, ...METADATA.success } };
    case FETCH_CHAT_LIST.FAILURE:
      return { ...state, chatList: { ...state.chatList, error: action.error, ...METADATA.error } };

    case FETCH_PROJECT_CHAT_LIST.REQUEST:
      return { ...state, projectChatList: { ...state.projectChatList, ...METADATA.request } };
    case FETCH_PROJECT_CHAT_LIST.SUCCESS:
      return { ...state, projectChatList: { data: action.chatList, ...METADATA.success } };
    case FETCH_PROJECT_CHAT_LIST.FAILURE:
      return {
        ...state,
        projectChatList: { ...state.projectChatList, error: action.error, ...METADATA.error }
      };

    case FETCH_MESSAGES.REQUEST:
      return { ...state, messages: { ...state.messages, ...METADATA.request } };
    case FETCH_MESSAGES.SUCCESS:
      const chatList = markAsRead(state.chatList, action.messages.chatId);
      return {
        ...state,
        messages: { data: action.messages, ...METADATA.success },
        chatList,
        projectChatList: chatList
      };
    case FETCH_MESSAGES.FAILURE:
      return { ...state, messages: { ...state.messages, error: action.error, ...METADATA.error } };
    case SET_CHAT_ID:
      return {
        ...state,
        selectedChatId: action.id,
        selectedChatIsClosed: action.selectedChatIsClosed,
        messages: { ...initialState.messages }
      };
    case WS_TYPING:
      return { ...state, lastTypingSignal: Date.now() };
    case WS_NEW_MESSAGE:
      return {
        ...state,
        messages: { ...state.messages, data: pushNewMessage(action.message, state.messages.data) }
      };
    case FETCH_CONTACT_LIST.REQUEST:
      return { ...state, contactList: { ...state.contactList, ...METADATA.request } };
    case FETCH_CONTACT_LIST.SUCCESS:
      return { ...state, contactList: { data: action.list, ...METADATA.success } };
    case FETCH_CONTACT_LIST.FAILURE:
      return {
        ...state,
        contactList: { ...state.contactList, error: action.error, ...METADATA.error }
      };
    default:
      return state;
  }
};

export default inboxReducer;

const pushNewMessage = (msg, currentMessages) => {
  currentMessages && currentMessages.list.push(msg);
  return currentMessages;
};

const markAsRead = (chatList, chatId) => {
  const copyChatList = { ...chatList };
  if (copyChatList.data && chatId) {
    copyChatList.data.list = copyChatList.data.list.map(item => {
      if (item.id === chatId) {
        item.new_message = false;
      }
      return item;
    });
    copyChatList.data.project_chat_list = copyChatList.data.project_chat_list.map(item => {
      if (item.id === chatId) {
        item.new_message = false;
      }
      return item;
    });
    return copyChatList;
  }
  return chatList;
};
