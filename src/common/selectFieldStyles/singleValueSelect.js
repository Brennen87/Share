export const singleValueSelect = {
  option: (provided, state) => ({
    ...provided,
    borderLeft: '2px solid #FFF',
    backgroundColor: state.isFocused && 'transparent',
    color: state.isFocused && '#000',
    cursor: 'pointer',
    fontSize: '14px',
    lineHeight: '16px',
    textTransform: 'capitalize',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',

    '&:hover': {
      color: '#FF8C00',
      borderColor: '#044C5A',
      backgroundColor: 'transparent'
    }
  }),
  placeholder: provided => ({
    ...provided,
    fontSize: '14px',
    lineHeight: '16px',
    color: '#868686'
  }),
  control: (provided, state) => ({
    ...provided,
    borderColor: '#C0C0C0',
    boxShadow: (
      state.isFocused ? 
      "inset 0 0 2px rgba(0, 0, 0, 0.3)" :
      "0 0 2px rgba(0, 0, 0, 0.3)"
    ),

    '&:hover': {
      borderColor: '#C0C0C0'
    }
  }),
  singleValue: provided => ({
    ...provided,
    fontSize: '14px',
    lineHeight: '16px',
    color: '#000000',
    textTransform: 'capitalize'
  }),
  menu: provided => ({
    ...provided,
    backgroundColor: '#F8F8F8',
    margin: '1px 0',
    overflow: 'hidden'
  }),
  menuList: provided => ({
    ...provided,
    '&::-webkit-scrollbar': {
      display: 'none'
    }
  }),
  indicatorSeparator: () => ({
    display: 'none'
  }),
  clearIndicator: provided => ({
    ...provided,
    color: '#044C5A',
    padding: '8px 5px',

    '&:hover': {
      color: '#ff8c00',
      cursor: 'pointer'
    }
  }),
  dropdownIndicator: (provided, { selectProps: { menuIsOpen } }) => ({
    ...provided,
    color: '#044C5A',
    transform: menuIsOpen && 'rotate(180deg)',
    padding: '8px 5px',
    '& svg path': {
      fill: menuIsOpen && '#ff8c00'
    },
    '&:hover': {
      color: '#ff8c00',
      cursor: 'pointer'
    }
  })
};
