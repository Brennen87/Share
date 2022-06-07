import * as React from 'react';
import * as classnames from 'classnames';
import ConversationsList from '../../ConversationsList';
import ScreenResolver from '../../../components/ScreenResolver';
import './index.scss';

export const InboxConversation = ({ toggleConversation, showNewConversation, disableToggle }) => {
  const [show, toggleList] = React.useState(false);
  return (
    <section className="inbox_conversation">
      <div className="inbox_conversation__top">
        <div className="inbox_conversation__inbox" onClick={() => toggleList(!show)}>
          <div className="inbox_conversation__inbox_title">Inbox</div>
          <svg
            width="12"
            height="7"
            viewBox="0 0 12 7"
            fill="none"
            style={{ transform: !disableToggle && show ? 'rotate(180deg)' : 'rotate(0)' }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.8801 0.721401L11.279 0.120283C11.1989 0.0400099 11.1066 0 11.0023 0C10.8982 0 10.806 0.0400099 10.7259 0.120283L6.00009 4.8458L1.27454 0.120409C1.19439 0.0401364 1.10216 0.000126278 0.997963 0.000126278C0.893727 0.000126278 0.801493 0.0401364 0.721389 0.120409L0.120313 0.721569C0.0400405 0.801673 3.05176e-05 0.893907 3.05176e-05 0.998143C3.05176e-05 1.1023 0.0401668 1.19453 0.120313 1.27463L5.72352 6.87797C5.80362 6.95811 5.8959 6.99816 6.00009 6.99816C6.10429 6.99816 6.1964 6.95811 6.27646 6.87797L11.8801 1.27463C11.9602 1.19449 12 1.10225 12 0.998143C12 0.893907 11.9602 0.801673 11.8801 0.721401Z"
              fill={!disableToggle ? '#044C5A' : '#c4c4c4'}
            />
          </svg>
          {!disableToggle && (
            <ScreenResolver
              large={970}
              mobile={
                <div
                  className={classnames(
                    'inbox_conversation__mobile_list',
                    show && 'inbox_conversation__mobile_list__active'
                  )}
                >
                  <ConversationsList
                    showNewConversation={showNewConversation}
                    toggleConversation={toggleConversation}
                  />
                </div>
              }
            />
          )}
        </div>

        <button
          onClick={() => toggleConversation()}
          className={classnames(
            'inbox_conversation__button',
            showNewConversation && 'inbox_conversation__button_active'
          )}
          disabled={disableToggle && showNewConversation}
        >
          New Conversation
        </button>
      </div>
      <ScreenResolver
        large={970}
        desktop={
          <div className="inbox_conversation__desktop_list">
            <ConversationsList
              toggleConversation={toggleConversation}
              showNewConversation={showNewConversation}
            />
          </div>
        }
      />
    </section>
  );
};
