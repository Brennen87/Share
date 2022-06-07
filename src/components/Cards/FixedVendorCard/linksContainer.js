import React from 'react';
import LinkAndWidth from '../../UI/LinkAndWidth';

const RESET_TIMEOUT = 100;
const MORE_BUTTON_OFFSET = 20;

class LinksContainer extends React.Component {
  constructor(props) {
    super(props);
    this.targetRef = React.createRef();
    this.movement_timer = null;
    this.linksWidth = [];
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

  calculateLinksLength = parentWidth => {
    const list = [];
    (this.props.labels || []).reduce((acc, item, index) => {
      if (index === 0) {
        list.push(item.id);
        acc += this.linksWidth[index];
        return acc;
      }

      if (acc + this.linksWidth[index] < parentWidth - MORE_BUTTON_OFFSET) {
        list.push(item.id);
      }

      acc += this.linksWidth[index];
      return acc;
    }, 0);

    this.updateShortList(list);
  };

  getDimensions = () => {
    if (this.targetRef.current) {
      this.calculateLinksLength(this.targetRef.current.offsetWidth);
    }
  };

  render() {
    const { labels, redirect, className } = this.props;
    const { shortList } = this.state;

    return (
      <div className={className} ref={this.targetRef}>
        {labels &&
          labels.map((link, index) => (
            <LinkAndWidth
              key={link.id}
              label={link.name}
              hidden={!shortList.includes(link.id)}
              last={index === shortList.length - 1}
              getWidth={width => this.linksWidth.push(width)}
              onClick={() => this.props.onClick(link)}
            />
          ))}
        {shortList.length !== this.linksWidth.length && (
          <span className="links_container__more" onClick={redirect}>
            ...
            <svg
              width="5"
              height="8"
              viewBox="0 0 5 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.480934 0.0799351L0.0801885 0.480708C0.0266734 0.534111 8.82962e-08 0.595628 8.74669e-08 0.665175C8.66396e-08 0.734554 0.0266734 0.796043 0.0801884 0.849446L3.23053 3.99996L0.0802727 7.15033C0.0267576 7.20376 8.4194e-05 7.26525 8.41932e-05 7.33471C8.41923e-05 7.4042 0.0267576 7.46569 0.0802727 7.51909L0.481046 7.91981C0.534449 7.97333 0.595938 8 0.665429 8C0.734864 8 0.796353 7.97324 0.849756 7.91981L4.58531 4.18434C4.63874 4.13094 4.66544 4.06942 4.66544 3.99996C4.66544 3.93049 4.63874 3.86909 4.58531 3.81572L0.849756 0.0799351C0.796325 0.0265322 0.734836 8.76283e-09 0.665429 7.93516e-09C0.595938 7.10649e-09 0.534449 0.0265322 0.480934 0.0799351Z"
                fill="#044C5A"
              />
            </svg>
          </span>
        )}
      </div>
    );
  }
}

export default LinksContainer;
