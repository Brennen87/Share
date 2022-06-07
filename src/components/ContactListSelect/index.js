import * as React from 'react';
import AsyncSelect from 'react-select/async';
import { connect } from 'react-redux';
import { fetchContactList } from '../../store/actions/inboxActions';
import { getFullName } from '../../helpers';
import { MenuList } from './modules/menu';
import './index.scss';

const style = {
  control: state => ({
    ...state,
    border: '1px solid #C4C4C4',
    boxShadow: 'none'
  })
};

class ContactListSelect extends React.Component {
  getContactList = async (inputValue, callback) => {
    if (!inputValue) {
      return callback([]);
    }

    const res = await this.props.fetchContactList({
      limit: 10,
      page: 1,
      search: inputValue,
      name_only: true,
      hide_self: true
    });

    const options = res.list
      .filter(contact => contact.username !== this.props.user.username)
      .map(contact => ({
        value: contact.user_id || contact.id,
        label: getFullName(contact.first_name, contact.last_name, contact.type),
        avatar: contact.avatar
      }));

    callback(options);
    this.props.options(options);
  };

  render() {
    const { autoFocus, option, onInputChange, onChange, className, value } = this.props;
    const val = value || option;
    return (
      <AsyncSelect
        cacheOptions
        defaultOptions
        value={val}
        autoFocus={autoFocus}
        loadOptions={this.getContactList}
        onChange={onChange}
        onInputChange={onInputChange}
        components={{ MenuList }}
        className={className}
        classNamePrefix={className}
        styles={style}
        placeholder=""
        isClearable
      />
    );
  }
}

const mapStateToProps = state => ({
  user: state.userStore.user,
  contactList: state.inboxStore.contactList
});

const mapDispatchToProps = dispatch => ({
  fetchContactList: params => dispatch(fetchContactList(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactListSelect);
