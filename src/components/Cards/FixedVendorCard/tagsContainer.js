import React from 'react';
import Tag from '../../UI/Tag';

const RESET_TIMEOUT = 100;
const MORE_BUTTON_OFFSET = 40;
const TAG_MARGIN = 15;

class TagsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.targetRef = React.createRef();
    this.movement_timer = null;
    this.tagWidth = [];
    this.hideStyle = {
      position: 'absolute',
      zIndex: '-1',
      opacity: 0
    };

    this.state = {
      showMore: false,
      shortList: []
    };
  }

  componentDidMount() {
    this.getDimensions();
    window.addEventListener('resize', () => {
      clearInterval(this.movement_timer);
      this.movement_timer = setTimeout(this.getDimensions, RESET_TIMEOUT);
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => clearInterval(this.movement_timer));
  }

  toggleMore = () => {
    this.setState({ ...this.state, showMore: !this.state.showMore });
  };

  updateShortList = shortList => {
    this.setState({ ...this.state, shortList });
  };

  calculateTagsLength = parentWidth => {
    const list = [];
    this.props.genres.reduce((acc, item, index) => {
      if (index === 0) {
        list.push(item.id);
        acc += this.tagWidth[index];
        return acc;
      }

      if (acc + this.tagWidth[index] < parentWidth - MORE_BUTTON_OFFSET) {
        list.push(item.id);
      }

      acc += this.tagWidth[index];
      return acc;
    }, 0);

    this.updateShortList(list);
  };

  getDimensions = () => {
    if (this.targetRef.current) {
      this.calculateTagsLength(this.targetRef.current.offsetWidth);
    }
  };

  render() {
    const { genres, className, searchText, redirect } = this.props;
    const { shortList, showMore } = this.state;

    return (
      <div className={className} ref={this.targetRef}>
        {genres.map(genre => (
          <Tag
            key={genre.id}
            id={genre.id}
            label={genre.name}
            searchText={searchText}
            style={!shortList.includes(genre.id) && !showMore ? this.hideStyle : null}
            highlight
            getWidth={width => this.tagWidth.push(width + TAG_MARGIN)}
          />
        ))}
        {shortList.length !== this.tagWidth.length && (
          <span className="tags_container_more" onClick={redirect}>
            ...More
          </span>
        )}
      </div>
    );
  }
}

export default TagsContainer;
