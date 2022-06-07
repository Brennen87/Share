import { singleValueSelect } from './singleValueSelect';

export const multiValueSelect = {
  ...singleValueSelect,
  multiValue: provided => ({
    ...provided,
    position: 'relative'
  }),
  multiValueLabel: provided => ({
    ...provided,
    backgroundColor: '#D2E5ED',
    color: '#000',
    paddingRight: '24px',
    borderRadius: '3px'
  }),
  multiValueRemove: provided => ({
    ...provided,
    backgroundColor: '#C4C4C4',
    color: '#fff',
    position: 'absolute',
    right: '5px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '14px',
    height: '14px',
    padding: '0',
    borderRadius: '2px',

    '&:hover': {
      backgroundColor: '#FF8C00',
      color: '#fff',
      cursor: 'pointer'
    }
  })
};
