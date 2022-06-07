import * as React from 'react';

export default class DocumentTitle extends React.Component {
  componentDidMount() {
    this.updateTitle();
  }

  updateTitle = () => {
    document.title = this.props.title;
  };

  render() {
    const { children } = this.props;

    if (!children) {
      return null;
    }
    return children;
  }
}
