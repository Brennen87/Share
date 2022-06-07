import React, { useEffect, useRef, useState } from 'react';
import ChatForm from '../../../../components/Form/ChatForm';
import { connect } from 'react-redux';
import { getFullName } from '../../../../helpers';
import { Sender } from './chat';
import { fetchMessages } from '../../../../store/actions/inboxActions';
import Preloader from '../../../../components/Preloader';
import { uploadFile } from '../../../../store/actions/fileActions';
import TypingIndicator from '../../../../components/TypingIndicator';
import { throttle } from 'lodash';
import '../index.scss';

function Chat({
  selectedChatId,
  selectedChatIsClosed,
  fetchMessages,
  messages,
  uploadFile,
  onMessageSubmit,
  onTyping,
  profile,
  lastTypingSignal
}) {
  const [state, setState] = useState(() => ({
    isPrepending: false,
    currentPage: 1,
    currentMessages: [],
    previousScrollHeight: 0
  }));
  const [isTyping, setIsTyping] = useState(false);
  const [isJustOpened, setIsJustOpened] = useState(true);
  const isPrepending = useRef(false);
  const scrollWindowRef = useRef();
  const isTypingTimeout = useRef();

  const messageNumber = messages.data?.list?.length || 0;
  useEffect(() => {
    if (selectedChatId) {
      setState({
        ...state,
        currentPage: 1,
        currentMessages: []
      });
      fetchMessages(selectedChatId, {
        limit: 10,
        page: 1
      });
    }
  }, [selectedChatId]);

  useEffect(() => {
    if (isJustOpened) {
      setIsJustOpened(false);
      return;
    }
    if (lastTypingSignal && !isTypingTimeout.current) {
      isTypingTimeout.current = setTimeout(() => {
        isTypingTimeout.current = null;
        setIsTyping(false);
      }, 2500);

      setIsTyping(true);
    }
  }, [lastTypingSignal]);

  useEffect(() => {
    if (messages.data?.list?.length) {
      const allMessages = [...messages.data.list, ...state.currentMessages];
      if (isPrepending.current) {
        const uniqueIds = [
          ...new Set([
            ...messages.data.list.map(e => e.id),
            ...state.currentMessages.map(e => e.id)
          ])
        ];
        const uniqueMessages = uniqueIds.map(id => allMessages.find(e => e.id === id));

        setState({
          ...state,
          previousScrollHeight: scrollWindowRef.current.scrollHeight,
          currentMessages: uniqueMessages
        });
      } else {
        const uniqueIds = [
          ...new Set([
            ...state.currentMessages.map(e => e.id),
            ...messages.data.list.map(e => e.id)
          ])
        ];
        const uniqueMessages = uniqueIds.map(id => allMessages.find(e => e.id === id));

        setState({
          ...state,
          currentMessages: uniqueMessages
        });
      }
    }
  }, [messages.data, messageNumber]);

  useEffect(() => {
    if (!isPrepending.current) {
      scrollToBottom();
    } else {
      scrollToPreviousPosition();
      isPrepending.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currentMessages]);

  useEffect(() => {
    if (state.currentPage > 1) {
      fetchMessages(selectedChatId, {
        limit: 10,
        page: state.currentPage
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currentPage]);

  function scrollToBottom() {
    scrollWindowRef.current.scrollTop = scrollWindowRef.current.scrollHeight;
  }

  function scrollToPreviousPosition() {
    scrollWindowRef.current.scrollTop =
      scrollWindowRef.current.scrollHeight - state.previousScrollHeight;
  }

  function onScroll() {
    const { scrollY } = window;
    const { scrollTop } = scrollWindowRef.current;

    if (
      scrollTop < 30 &&
      messages?.data?.list?.length &&
      !messages?.loading &&
      messages?.data?.total_pages > state.currentPage
    ) {
      isPrepending.current = true;
      throttle(() => {
        setState({
          ...state,
          currentPage: state.currentPage + 1
        });
      }, 1000)();
    }
  }

  function getMessageAuthor(author) {
    return author.id === profile.id ? 'Me' : getFullName(author.first_name, author.last_name);
  }

  function renderContent({ loading }) {
    if (loading) {
      return <Preloader className="chat__preloader" />;
    }

    return state.currentMessages.map(message => {
      const { id, author, content, timestamp, attachments } = message;
      return (
        <Sender
          key={id}
          fullname={getMessageAuthor(author)}
          author={author}
          parentChatUser={profile}
          date={timestamp}
          text={content}
          timestamp={timestamp}
          attachments={attachments}
        />
      );
    });
  }

  return (
    <div className="chat">
      <div
        className={`chat_content ${lastTypingSignal ? lastTypingSignal.toString() : ''}`}
        ref={scrollWindowRef}
        onScroll={onScroll}
        data-message-number={messageNumber}
      >
        {renderContent(messages)}
        {isTyping && <TypingIndicator />}
      </div>
      <ChatForm
        onSubmit={onMessageSubmit}
        uploadFile={uploadFile}
        onTyping={onTyping}
        selectedChatIsClosed={selectedChatIsClosed}
      />
    </div>
  );
}

const mapStateToProps = state => ({
  profile: state.userStore.user,
  messages: state.inboxStore.messages,
  selectedChatId: state.inboxStore.selectedChatId,
  selectedChatIsClosed: state.inboxStore.selectedChatIsClosed,
  lastTypingSignal: state.inboxStore.lastTypingSignal
});

const mapDispatchToProps = dispatch => ({
  fetchMessages: (chatId, params) => dispatch(fetchMessages(chatId, params)),
  uploadFile: file => dispatch(uploadFile(file))
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
