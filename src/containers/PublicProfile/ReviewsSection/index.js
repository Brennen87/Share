import * as React from 'react';
import connect from 'react-redux/es/connect/connect';
import Preloader from '../../../components/Preloader';
import ReviewCard from '../../../components/Cards/ReviewCard';
import { fetchReviews } from '../../../store/actions/reviewActions';
import Pagination from '../../../components/Pagination';
import './index.scss';

class ReviewsSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      limit: 7
    };
  }

  componentDidMount() {
    const { role, id } = this.props;
    this.props.fetchReviews(role, id, this.state);
  }

  componentDidUpdate(prevProps, prevState) {
    const { role, id } = this.props;
    if (prevState.page !== this.state.page) {
      this.props.fetchReviews(role, id, this.state);
    }

    // I couldn't manage to scroll to this section, because after the scroll something
    // is changing somewhere up in the component tree and it makes the whole page
    // rerender so it jumps back to the top position
    /* if (this.props.reviews.data) {
      const searchParams = new URLSearchParams(this.props.location.search);
      if (searchParams.get('to') === 'review') {
        window.scrollTo(
          0,
          document.querySelector('.profile_pub_page').scrollHeight -
            document.querySelector('.review_section').scrollHeight
        );
      }
    } */
  }

  render() {
    const { loading, data } = this.props.reviews;
    return <>{this.renderContent(loading, data)}</>;
  }

  renderContent(loading, data) {
    if (loading && !data) {
      return <Preloader />;
    }
    if (data && !data.total_count) {
      return null;
    }

    if (data) {
      return (
        <div className="review_section">
          <div className="review_section__title">
            Reviews <span>({data.total_count || 0})</span>
          </div>
          {!data.total_count ? (
            <div className="review_section__cards">
              <span>no reviews</span>
            </div>
          ) : (
            <>
              <div className="review_section__cards">
                {data.list.map(review => (
                  <ReviewCard
                    key={review.id}
                    review={{
                      role: this.props.role === 'customer' ? 'vendor' : 'customer',
                      username: review.created_by.username,
                      firstName: review.created_by.first_name,
                      lastName: review.created_by.last_name,
                      avatar: review.created_by.avatar,
                      rating: review.rating,
                      text: review.comment,
                      isActive: review.created_by.is_active,
                      date: review.created_at || '2020-06-06T15:11:40.698177Z'
                    }}
                  />
                ))}
              </div>
              <div className="review_section__pagination">
                <Pagination
                  totalPages={(data && data.total_pages) || 0}
                  activePage={this.state.page}
                  onChange={page => {
                    this.setState({ ...this.state, page });
                  }}
                />
              </div>
            </>
          )}
        </div>
      );
    }
    return null;
  }
}

const mapStateToProps = state => ({
  reviews: state.reviewStore.reviews,
  user: state.userStore.user
});

const mapDispatchToProps = dispatch => ({
  fetchReviews: (role, id, query, isNext) => dispatch(fetchReviews(role, id, query, isNext))
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewsSection);
