import * as React from 'react';
import searchIcon from '../../assets/icons/icon_search_white.svg';
import * as classnames from 'classnames';
import './index.scss';

const SearchInput = props => {
  const { onChange, onSubmit, handleBlur, value = '', placeholder = '', className } = props;
  return (
    <div className={classnames(className, 'search_input')} onBlur={handleBlur}>
      <div className="search_input__input_wrap">
        <input
          type="text"
          name="search"
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          className="search_input__input"
        />
      </div>
      <button className="search_input__submit" type="submit" onSubmit={onSubmit} >
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.82598 11.3375C2.6084 11.3375 0 8.7997 0 5.66876C0 2.53781 2.6084 0 5.82598 0C9.04356 0 11.652 2.53781 11.652 5.66876C11.652 7.04561 11.1474 8.3078 10.3086 9.29002L14.7562 13.6175C15.0813 13.9338 15.0813 14.4467 14.7562 14.763C14.4312 15.079 13.9042 15.079 13.5792 14.763L9.07171 10.377C8.14413 10.9836 7.02757 11.3375 5.82598 11.3375ZM5.82598 9.71787C8.12431 9.71787 9.9874 7.90486 9.9874 5.66876C9.9874 3.43265 8.12431 1.61964 5.82598 1.61964C3.52765 1.61964 1.66457 3.43265 1.66457 5.66876C1.66457 7.90486 3.52765 9.71787 5.82598 9.71787Z"
            fill="white"
          />
        </svg>
      </button>
    </div>
  );
};

export default SearchInput;
