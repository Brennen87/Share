import * as React from 'react';
import { connect } from 'react-redux';
import { clearTeamList, fetchTeamList, removeTeammate } from '../../store/actions/teamActions';
import { fetchProjectChatList } from '../../store/actions/inboxActions';
import Preloader from '../../components/Preloader';
import DocumentTitle from '../../components/DocumentTitle';
import { ROLES } from '../../common/constants';
import FixedVendorCard from '../../components/Cards/FixedVendorCard';
import Pagination from '../../components/Pagination';
import CustomerCard from '../../components/Cards/CustomerCard';
import ScreenResolver from '../../components/ScreenResolver';
import { InfoBlock } from '../../components/UI/InfoBlock';
import { InfoTooltip } from '../../components/UI/InfoTooltip';
import './index.scss';

class TeamPage extends React.Component {
  state = {
    limit: 10,
    page: 1
  };

  componentDidMount() {
    this.getTeam();
    this.props.fetchProjectChatList({ page: 1, limit: 10 });
  }

  componentWillUnmount() {
    this.props.clearTeamList();
  }

  getTeam = () => {
    const { user, fetchTeamList } = this.props;
    switch (user.role) {
      case ROLES.vendor:
        return fetchTeamList(this.state, 'customers');
      case ROLES.customer:
        return fetchTeamList(this.state, 'team');
      default:
        return null;
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevState) !== JSON.stringify(this.state)) {
      this.getTeam();
    }
  }

  onRemove = (id, type) => {
    id && type && this.props.removeTeammate(id, type);
  };

  render() {
    const { teamList, projectChatList, route, user } = this.props;
    const isCustomer = user && user.role === ROLES.customer;
    const teamCount = (teamList.data && teamList.data.total_count) || 0;

    const chatCollector = (accumulator, chat) => {
      if (!isCustomer) {
        const { id } = chat.participant;
        if (!(id in accumulator)) {
          const { id: chatId, status } = chat;
          accumulator[id] = { id: chatId, status };
        }
      } else {
        const { vendor_id } = chat.participant;
        if (!(vendor_id in accumulator)) {
          const { id: chatId, status } = chat;
          accumulator[vendor_id] = { id: chatId, status };
        }
      }
      return accumulator;
    };

    const userChats = (projectChatList?.data?.list ?? []).reduce(chatCollector, {});

    const chatListOfProjects = (projectChatList?.data?.project_chat_list ?? [])
      .filter(project => ['PENDING_CANCELLATION', 'IN_PROGRESS'].includes(project.status))
      .sort((a, b) => b.project_id - a.project_id);
    const projectChats = chatListOfProjects.reverse().reduce(chatCollector, {});

    const chats = { ...userChats, ...projectChats };

    return (
      <DocumentTitle title={isCustomer ? route.pageTitle : 'Kuprik - Customers'}>
        <div className="team_page">
          <div className="container">
            {isCustomer ? (
              <h4 className="team_page__title">
                My team <span>({teamCount})</span>
              </h4>
            ) : (
              <h4 className="team_page__title">
                My Customers <span>({teamCount})</span>
              </h4>
            )}
            {
              <ScreenResolver
                large={576}
                desktop={
                  <InfoBlock 
                    text={
                      isCustomer ?
                      "This list is all of the people that you hired. The system automatically adds your hires to your team. Please note if you delete a hire from the list, you cannot add them back unless you rehire that person."
                      :
                      "This list is all the people that you have worked with. The system automatically adds them to your customers. Please note if you delete a customer from the list, you cannot add them back unless you work with that person again."
                    }
                    className="team_page__warning" />
                }
                mobile={
                  <InfoTooltip 
                    text={
                      isCustomer ?
                      "This list is all of the people that you hired. The system automatically adds your hires to your team. Please note if you delete a hire from the list, you cannot add them back unless you rehire that person."
                      :
                      "This list is all the people that you have worked with. The system automatically adds them to your customers. Please note if you delete a customer from the list, you cannot add them back unless you work with that person again."
                    }
                    className="team_page__warning" />
                }
              />
            }
            {this.renderContent(teamList, teamCount, isCustomer, chats)}
          </div>
        </div>
      </DocumentTitle>
    );
  }

  renderContent = (teamList, teamCount, isCustomer, chats) => {
    if (teamList.loading) {
      return <Preloader className="team_page__preloader" />;
    }

    if (teamList.error) {
      return <div className="team_page__error">Something went wrong while fetching your teams</div>;
    }
    // comment
    if (teamList.data && teamList.data.list && teamCount) {
      return (
        <React.Fragment>
          <div className="team_page__people">
            {isCustomer
              ? teamList.data.list.map(vendor => (
                  <FixedVendorCard
                    key={vendor.id}
                    vendor={vendor}
                    user={this.props.user}
                    onRemove={() => this.onRemove(vendor.id, ROLES.vendor)}
                    relatedChat={chats[vendor.id]}
                  />
                ))
              : teamList.data.list.map(customer => (
                  <CustomerCard
                    key={customer.id}
                    customer={customer}
                    onRemove={() => this.onRemove(customer.id, ROLES.customer)}
                    relatedChat={chats[customer.id]}
                  />
                ))}
          </div>

          <div className="team_page__pagination">
            <Pagination
              totalPages={teamList.data.total_pages || 0}
              activePage={this.state.page}
              onChange={page => {
                this.setState({ ...this.state, page });
              }}
            />
          </div>
        </React.Fragment>
      );
    }

    return <div>{`No ${isCustomer ? 'team members' : 'customers'} yet`}</div>;
  };
}

const mapStateToProps = state => ({
  user: state.userStore.user,
  teamList: state.teamStore.teamList,
  projectChatList: state.inboxStore.projectChatList
});

const mapDispatchToProps = dispatch => ({
  fetchTeamList: (params, endpoint) => dispatch(fetchTeamList(params, endpoint)),
  removeTeammate: (id, type) => dispatch(removeTeammate(id, type)),
  clearTeamList: () => dispatch(clearTeamList()),
  fetchProjectChatList: params => dispatch(fetchProjectChatList(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamPage);
