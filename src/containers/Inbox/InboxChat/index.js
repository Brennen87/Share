import * as React from 'react';
import Chat from './Chat';
import './index.scss';

export const InboxChat = ({ onMessageSubmit, onTyping }) => {
  return (
    <section className="inbox_chat">
      <Chat onMessageSubmit={onMessageSubmit} onTyping={onTyping} />
    </section>
  );
};
