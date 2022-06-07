import * as React from 'react';
import Highlighter from 'react-highlight-words';
import { withRouter } from 'react-router';
import './index.scss';

class Tag extends React.Component {
  constructor(props) {
    super(props);
    this.targetRef = React.createRef();
  }

  componentDidMount() {
    if (this.targetRef.current && this.props.getWidth) {
      this.props.getWidth(this.targetRef.current.offsetWidth);
    }
  }

  onTagClick = id => {
    this.props.history.push(`/vendors?limit=10&page=1&genres=${id}`);
  };

  render() {
    const { id, label, highlight, searchText, style = {} } = this.props;
    return (
      <div
        className="tag"
        ref={this.targetRef}
        style={style}
        onClick={() =>
          this.props.onClick ? this.props.onClick({ value: id, label }) : this.onTagClick(id)
        }
      >
        <div className="tag_label">
          <Highlighter
            highlightClassName="highlighted"
            searchWords={highlight ? [searchText] : []}
            textToHighlight={label}
            autoEscape
          />
        </div>
      </div>
    );
  }
}

export default withRouter(Tag);
