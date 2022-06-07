import * as React from 'react';
import * as classnames from 'classnames';
import './index.scss';

const LIMIT = 5;

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: this.props.activePage
    };
  }

  setPage = page => {
    this.setState({ active: page });
    this.props.onChange(page);
  };

  nextPage = () => {
    if (this.state.active + 1 <= this.props.totalPages) {
      this.setPage(this.state.active + 1);
    }
  };

  prevPage = () => {
    if (this.state.active > 1) {
      this.setPage(this.state.active - 1);
    }
  };

  renderDots = () => (
    <div key={Math.random()} className="pagination__dots">
      ...
    </div>
  );

  renderPages = () => {
    const { totalPages } = this.props;
    const pages = new Array(totalPages).fill('').map((noop, idx) => {
      const index = idx + 1;
      return (
        <div
          onClick={() => this.setPage(index)}
          key={noop + idx}
          className={classnames(
            'pagination__page',
            this.state.active === index && 'pagination__page_active'
          )}
        >
          {index}
        </div>
      );
    });

    if (totalPages <= 6) {
      return pages;
    }

    if (this.state.active === totalPages || totalPages - this.state.active === 1) {
      return [pages[0], this.renderDots(), ...pages.slice(totalPages - LIMIT)];
    }

    if (this.state.active - LIMIT <= 0) {
      return [pages.slice(0, LIMIT), this.renderDots(), pages.pop()];
    }

    return [
      pages[0],
      this.renderDots(),
      pages.slice(this.state.active - LIMIT, this.state.active),
      this.renderDots(),
      pages[pages.length - 1]
    ];
  };

  render() {
    const { totalPages, className } = this.props;
    if (!totalPages || totalPages === 1) {
      return null;
    }

    return (
      <div className={classnames('pagination__wrapper', className)}>
        <div className="pagination">
          <div className="pagination__prev" onClick={() => this.prevPage()} />
          {this.renderPages()}
          <div className="pagination__next" onClick={() => this.nextPage()} />
        </div>
      </div>
    );
  }
}

export default Pagination;
