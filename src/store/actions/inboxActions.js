import axios from '../../axios-api';
import Pathes from '../../common/pathes';
import queryString from 'query-string';
import {
  CREATE_CHAT,
  FETCH_CHAT_LIST,
  FETCH_CONTACT_LIST,
  FETCH_MESSAGES,
  FETCH_PROJECT_CHAT_LIST,
  SET_CHAT_ID,
  WS_NEW_MESSAGE,
  WS_TYPING
} from './actionTypes';

const fetchChatListRequest = () => ({ type: FETCH_CHAT_LIST.REQUEST });
const fetchChatListSuccess = chatList => ({ type: FETCH_CHAT_LIST.SUCCESS, chatList });
const fetchChatListFailure = error => ({ type: FETCH_CHAT_LIST.FAILURE, error });

const fetchProjectChatListRequest = () => ({ type: FETCH_PROJECT_CHAT_LIST.REQUEST });
const fetchProjectChatListSuccess = chatList => ({
  type: FETCH_PROJECT_CHAT_LIST.SUCCESS,
  chatList
});
const fetchProjectChatListFailure = error => ({ type: FETCH_PROJECT_CHAT_LIST.FAILURE, error });

const fetchMessagesRequest = () => ({ type: FETCH_MESSAGES.REQUEST });
const fetchMessagesSuccess = messages => ({ type: FETCH_MESSAGES.SUCCESS, messages });
const fetchMessagesFailure = error => ({ type: FETCH_MESSAGES.FAILURE, error });

const createChatRequest = () => ({ type: CREATE_CHAT.REQUEST });
const createChatSuccess = () => ({ type: CREATE_CHAT.SUCCESS });
const createChatFailure = () => ({ type: CREATE_CHAT.FAILURE });

const fetchContactListRequest = () => ({ type: FETCH_CONTACT_LIST.REQUEST });
const fetchContactListSuccess = list => ({ type: FETCH_CONTACT_LIST.SUCCESS, list });
const fetchContactListFailure = error => ({ type: FETCH_CONTACT_LIST.FAILURE, error });

export const fetchChatList = (params, setDefault) => (dispatch, getState) => {
  const query = `?${queryString.stringify(params)}`;
  dispatch(fetchChatListRequest());
  return axios
    .get(Pathes.Inbox.chats + query)
    .then(
      response => {
        if (response && response.data && (response.data.list || response.data.project_chat_list)) {
          const currentUser = getState().userStore.user;
          const responseData = {
            ...response.data,
            list: response.data.list.filter(chat => chat.participant.id !== currentUser.id),
            project_chat_list: response.data.project_chat_list
          };
          dispatch(fetchChatListSuccess(responseData));
          dispatch(fetchProjectChatListSuccess(responseData));
          if (responseData.list.length && setDefault) {
            dispatch({ type: SET_CHAT_ID, id: responseData.list[0].id });
          }
          return responseData;
        }
      },
      error => {
        dispatch(fetchChatListFailure(error));
      }
    )
    .catch(() => dispatch(fetchChatListFailure({ global: 'Something went wrong' })));
};

export const fetchProjectChatList = params => {
  return dispatch => {
    const query = `?${queryString.stringify(params)}`;
    dispatch(fetchProjectChatListRequest());
    return axios
      .get(Pathes.Inbox.chats + query)
      .then(
        response => {
          if (response && response.data && response.data.list) {
            dispatch(fetchProjectChatListSuccess(response.data));
          }
        },
        error => {
          dispatch(fetchProjectChatListFailure(error));
        }
      )
      .catch(() => dispatch(fetchProjectChatListFailure({ global: 'Something went wrong' })));
  };
};

export const fetchMessages = (chatId, params) => {
  return dispatch => {
    const query = queryString.stringify(params);
    dispatch(fetchMessagesRequest());
    return axios
      .get(Pathes.Inbox.messages(chatId, query))
      .then(
        response => {
          const list = response.data.list.reverse();
          dispatch(fetchMessagesSuccess({ ...response.data, list, chatId }));
        },
        error => {
          dispatch(fetchMessagesFailure(error));
        }
      )
      .catch(() => dispatch(fetchMessagesFailure({ global: 'Something went wrong' })));
  };
};

export const pushNewMessage = res => {
  return dispatch => {
    dispatch({ type: WS_NEW_MESSAGE, message: res.message });
  };
};

export const sendTypingSignal = signal => {
  return (dispatch, getState) => {
    const { email } = getState().userStore.user;
    if (email !== signal.message.from) {
      dispatch({ type: WS_TYPING });
    }
  };
};

export const createChat = (chat, isSetChatId) => {
  return dispatch => {
    dispatch(createChatRequest());
    return axios.post(Pathes.Inbox.chats, chat).then(
      response => {
        if (response && response.data) {
          dispatch(createChatSuccess());
          isSetChatId && dispatch({ type: SET_CHAT_ID, id: response.data.id });
          return response.data;
        }
      },
      error => {
        dispatch(createChatFailure(error));
      }
    );
  };
};

export const fetchContactList = params => {
  return (dispatch, getState) => {
    const { role } = getState().userStore.user;
    if (role) {
      dispatch(fetchContactListRequest());
      const query = queryString.stringify(params);
      const path = role === 'customer' ? Pathes.Vendors.vendors : Pathes.Customer.customers;
      return axios.get(`${path}?${query}`).then(
        response => {
          dispatch(fetchContactListSuccess(response.data));
          return response.data;
        },
        error => {
          dispatch(fetchContactListFailure(error));
          return [];
        }
      );
    }
  };
};

export const setChatID = (id, selectedChatIsClosed = false) => {
  return dispatch => dispatch({ type: SET_CHAT_ID, id, selectedChatIsClosed });
};
