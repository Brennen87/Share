import React from 'react';
import { Formik } from 'formik';
import DatePickerCalendar from '../../UI/DatePickerCalendar';
import SmallButton from '../../UI/SmallButton';
import { REQUEST_DATE_FORMAT } from '../../../common/constants';
import moment from 'moment';

class ExtendProjectForm extends React.Component {
  onSubmit = ({ date }, formik) => {
    if (date) {
      const formatedDate = moment(date).format(REQUEST_DATE_FORMAT);
      return this.props.onSubmit(formatedDate, formik);
    }
    return Promise.reject();
  };

  render() {
    return (
      <Formik
        enableReinitialize
        initialValues={{ date: new Date() }}
        onSubmit={(values, formikBag) => this.onSubmit(values, formikBag)}
      >
        {({ values, handleChange, handleSubmit, isSubmitting, setFieldValue }) => (
          <form className="project_detail_ext_date__row" onSubmit={handleSubmit}>
            <div className="project_detail_ext_date__new_label">New Due Date</div>
            <DatePickerCalendar
              onChange={date => setFieldValue('date', date)}
              value={values.date}
              minDate={new Date()}
              maxDate={moment()
                .add(3, 'month')
                .toDate()}
              className="project_detail_ext_date__calendar"
            />
            <SmallButton
              type="submit"
              onSubmit={handleSubmit}
              label={this.props.extensions.length > 0 ? 'Extend again' : 'Extend'}
              disabled={isSubmitting || this.props.cancellation}
              className="project_detail_ext_date__extend_btn"
            />
          </form>
        )}
      </Formik>
    );
  }
}

export default ExtendProjectForm;
