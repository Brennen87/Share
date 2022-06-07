import * as React from 'react';
import DocumentTitle from '../../components/DocumentTitle';
import { connect } from 'react-redux';
import Preloader from '../../components/Preloader';
import EmptyData from '../../components/EmptyData';
import { CHAT_TYPES, ROLES } from '../../common/constants';
import { createChat } from '../../store/actions/inboxActions';
import VendorCard from '../../components/Cards/VendorCard';
import './index.scss';
import CustomerCard from '../../components/Cards/CustomerCard/index';

class SearchPage extends React.Component {
  render() {
    const { route, history, searchResult, searchText, user } = this.props;

    if (searchResult.loading) {
      return <Preloader className="search_page__preloader" />;
    }

    if (!searchResult.data) {
      history.push('/home');
    }

    if (searchResult.data && searchResult.data.list.length === 1) {
      history.push(
        `/${user.role === 'vendor' ? 'customer' : 'vendor'}/${searchResult.data.list[0].username}`
      );
    }

    return (
      <DocumentTitle title={route.pageTitle}>
        <div className="container">
          <div className="search_page">
            {searchResult.data &&
              searchResult.data.list.map(result =>
                user.role === 'customer' ? (
                  <VendorCard
                    key={result.id}
                    searchText={searchText}
                    highlight
                    truncateDescription
                    role={user && user.role}
                    onContact={() => this.onContact(result.user_id)}
                    vendor={{
                      id: result.id,
                      userId: result.user_id,
                      firstName: result.first_name,
                      lastName: result.last_name,
                      avatar: result.avatar,
                      services: result.services,
                      expertise: result.expertises,
                      genres: result.genres,
                      rating: { rate: result.review?.rating, count: result.review?.count },
                      charge: result.rate,
                      completedProjects: result.projects?.completed,
                      location: result.country,
                      description: result.mini_resume,
                      online: result.online,
                      username: result.username
                    }}
                  />
                ) : (
                  <CustomerCard
                    key={result.id}
                    customer={result}
                    onRemove={false}
                    relatedChat={null}
                  />
                )
              )}

            {searchResult.data && !searchResult.data.list.length && (
              <EmptyData text={`No matches for "${searchText}" were found.`} />
            )}
          </div>
        </div>
      </DocumentTitle>
    );
  }

  onContact = async id => {
    const { user } = this.props;
    if (!user) {
      return this.props.history.push('/login');
    }

    const chatObject = {
      room_type: CHAT_TYPES.user,
      message: null,
      author_id: user.id,
      participant_id: id
    };

    const chat = await this.props.createChat(chatObject, true);
    chat && this.props.history.push('/inbox');
  };
}

const mapStateToProps = state => ({
  user: state.userStore.user,
  searchText: state.searchStore.searchValue,
  searchResult: state.searchStore.searchResult
});

const mapDispatchToProps = dispatch => ({
  createChat: (id, setChatId) => dispatch(createChat(id, setChatId))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
