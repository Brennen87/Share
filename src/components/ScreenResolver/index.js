import * as React from 'react';
import PropTypes from 'prop-types';

const RESOLUTION_TYPES = {
  mobile: 'mobile',
  desktop: 'desktop'
};

export default class ScreenResolver extends React.Component {
  constructor(props) {
    super(props);
    this.large = props.large || 700;
    this.state = { isMobile: false };
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
    this.onResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  render() {
    return (
      <React.Fragment>
        {this.state.isMobile
          ? !!this.props.mobile && this.props.mobile
          : !!this.props.desktop && this.props.desktop}
      </React.Fragment>
    );
  }

  setResolution = value => {
    this.setState({ isMobile: value });
  };

  getWindowResolution = () =>
    window.innerWidth < this.large ? RESOLUTION_TYPES.mobile : RESOLUTION_TYPES.desktop;

  onResize = () => {
    this.setResolution(this.getWindowResolution() === RESOLUTION_TYPES.mobile);
  };
}

ScreenResolver.propTypes = {
  large: PropTypes.number,
  desktop: PropTypes.element,
  mobile: PropTypes.element
};
