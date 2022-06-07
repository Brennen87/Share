import * as React from 'react';
import { connect } from 'react-redux';
import InboxProjectCard from '../../components/Cards/InboxProjectCard';
import Preloader from '../../components/Preloader';
import { setChatID } from '../../store/actions/inboxActions';

class InboxProjectsList extends React.Component {
  render() {
    return (
      <div className="inbox_projects_list">{this.renderContent(this.props.projectChatList)}</div>
    );
  }

  onSelect = (id, chatIsClosed) => {
    this.props.setChatID(id, chatIsClosed);
    this.props.toggleConversation(false);
  };

  renderContent = ({ data, loading }) => {
    const { showNewConversation } = this.props;
    if (loading) {
      return <Preloader className="inbox__preloader" />;
    }
    const projectChatList = [...(data?.project_chat_list || [])];
    const sortedProjectChatList = [
      ...projectChatList.filter(chat => chat.id === this.props.selectedChatId),
      ...projectChatList.filter(chat => chat.id !== this.props.selectedChatId)
    ];
    return sortedProjectChatList.map(project => {
      const isClosed = ['CANCELLED', 'COMPLETED'].includes(project.status);
      return (
        <InboxProjectCard
          key={project.id}
          id={project.project_id}
          firstName={project.participant.first_name}
          lastName={project.participant.last_name}
          title={project.project}
          active={!showNewConversation && project.id === this.props.selectedChatId}
          onClick={() => this.onSelect(project.id, isClosed)}
          newMessage={project.new_message}
          status={project.status}
        />
      );
    });
  };
}

const mapStateToProps = state => ({
  selectedChatId: state.inboxStore.selectedChatId,
  projectChatList: state.inboxStore.projectChatList
});

const mapDispatchToProps = dispatch => ({
  setChatID: (id, chatIsClosed) => dispatch(setChatID(id, chatIsClosed))
});

export default connect(mapStateToProps, mapDispatchToProps)(InboxProjectsList);
