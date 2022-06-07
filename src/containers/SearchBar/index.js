import * as React from 'react';
import SearchInput from '../../components/SearchInput';
import { search } from '../../store/actions/searchActions';
import { connect } from 'react-redux';

class SearchBar extends React.Component {
  constructor() {
    super();
    this.state = {
      latestValue: "",
      value: ''
    };
  }

  render() {
    const { value } = this.state;
    const { className } = this.props;
    return (
      <form onSubmit={this.onSubmit} className={className}>
        <SearchInput 
          onChange={this.onSearchChange} 
          onSubmit={this.onSubmit} 
          handleBlur={this.handleBlur}
          value={value} 
        />
      </form>
    );
  }

  onSearchChange = e => {
    const { value } = e.target;
    this.setState({ ...this.state, value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.state.value && this.props.search(this.state.value);
  };

  resetValue = () => {
    this.setState({ latestValue: this.state.value, value: "" });
  }

  handleBlur = e => {
    const currentTarget = e.currentTarget;

    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement)) {
        this.resetValue();
      }
    }, 0);
  }
}

const mapDispatchToProps = dispatch => ({
  search: text => dispatch(search(text))
});

export default connect(null, mapDispatchToProps)(SearchBar);
