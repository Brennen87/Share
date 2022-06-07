import * as React from 'react';
import * as classnames from 'classnames';
import DatePicker from 'react-date-picker';
import PropTypes from 'prop-types';
import './index.scss';

export default class DatePickerCalendar extends React.Component {
  state = {
    date: this.props.value || new Date()
  };

  onChange = date => {
    this.setState({ date });
    this.props.onChange(date);
  };

  render() {
    const { className, ...other } = this.props;
    return (
      <DatePicker
        locale="en-US"
        className={classnames('calendar', className)}
        tileClassName="calendar__tile"
        onChange={this.onChange}
        value={this.state.date}
        {...other}
      />
    );
  }
}

DatePickerCalendar.propTypes = {
  value: PropTypes.instanceOf(Date),
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string
};
