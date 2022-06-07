import React from 'react';
import DatePickerCalendar from '../../../components/UI/DatePickerCalendar';
import RadioButton from '../../../components/UI/RadioButton';
import CheckboxWhite from '../../../components/UI/CheckboxWhite';
import SmallButton from '../../../components/UI/SmallButton';
import Notify from '../../../components/Notification';
import TOASTER_MESSAGES from '../../../common/toaster';
import { forceDownloadFile, formatToDate } from '../../../helpers';
import { fetchPaymentHistoryDownload } from '../../../store/actions/paymentsActions';
import { connect } from 'react-redux';
import './index.scss';

const PaymentModal = ({ setIsOpen }) => {
  const [formState, setFormState] = React.useState({
    file_type: 'CSV',
    date_start: new Date(),
    date_end: new Date()
  });

  function downloadPaymentHistory() {
    const date_start = formatToDate(formState.date_start);
    const date_end = formatToDate(formState.date_end);
    fetchPaymentHistoryDownload({
      ...formState,
      date_start,
      date_end
    })
      .then(result => {
        if (result.status > 400) {
          throw new Error(TOASTER_MESSAGES.errorWhileDownloadingFile);
        }
        const fileName = `payment_history_${date_start}-${date_end}.${formState.file_type.toLowerCase()}`;
        forceDownloadFile(result.data, fileName, result.headers['content-type']);
      })
      .catch(error => {
        Notify.info({ text: error.message });
      });
  }

  return (
    <div className="payment__modal">
      <div className="pm_header">
        <h3>Download Payment History</h3>
      </div>
      <div className="pm_main">
        <div className="pm_main_item">
          <h4 className="pm_main_item_title">Within a Date Range</h4>
          <div className="pm_main_item_content pm_main_item__date">
            <div className="from">
              <span>From</span>
              <DatePickerCalendar
                onChange={date_start => {
                  setFormState({
                    ...formState,
                    date_start
                  });
                }}
                value={formState.date_start}
              />
            </div>
            <div className="to">
              <span>to</span>
              <DatePickerCalendar
                onChange={date_end => {
                  setFormState({
                    ...formState,
                    date_end
                  });
                }}
                value={formState.date_end}
              />
            </div>
          </div>
        </div>
        <div className="pm_main_split">
          <div className="pm_main_item">
            <h4 className="pm_main_item_title">Project Status</h4>
            <div className="pm_main_item_content">
              {/*<CheckboxWhite*/}
              {/*  className="pm_main_item__check"*/}
              {/*  label="All Projects"*/}
              {/*  onChange={() => {*/}
              {/*    const newFormState = { ...formState };*/}
              {/*    delete newFormState.status;*/}
              {/*    setFormState(newFormState);*/}
              {/*  }}*/}
              {/*  checked={!formState?.status}*/}
              {/*/>*/}
              <CheckboxWhite
                label="Completed"
                className="pm_main_item__check"
                checked={!formState?.status || formState?.status === 'COMPLETED'}
                onChange={() => setFormState({ ...formState, status: 'COMPLETED' })}
              />
              {/*<CheckboxWhite*/}
              {/*  className="pm_main_item__check"*/}
              {/*  label="In Progress"*/}
              {/*  checked={!formState?.status || formState?.status === 'IN_PROGRESS'}*/}
              {/*  onChange={() => setFormState({ ...formState, status: 'IN_PROGRESS' })}*/}
              {/*/>*/}
            </div>
          </div>
          <div className="pm_main_item">
            <h4 className="pm_main_item_title">File Type</h4>
            <div className="pm_main_item_content">
              <RadioButton
                className="pm_main_item__check"
                label="CSV"
                name="file_type"
                onChange={() =>
                  setFormState({
                    ...formState,
                    file_type: 'CSV'
                  })
                }
                checked={formState?.file_type === 'CSV'}
              />
              {/* <RadioButton
              className="pm_main_item__check"
              label="PDF"
              name="file_type"
              onChange={() =>
                setFormState({
                  ...formState,
                  file_type: 'PDF'
                })
              }
            /> */}
            </div>
          </div>
        </div>
      </div>
      <div className="pm_button__content">
        <SmallButton
          label="Cancel"
          onClick={() => {
            setIsOpen(false);
          }}
        />
        <SmallButton
          label="Download"
          disabled={!formState.file_type || !formState.date_start || !formState.date_end}
          onClick={() => downloadPaymentHistory()}
        />
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  fetchPaymentHistoryDownload: parameters => dispatch(fetchPaymentHistoryDownload(parameters))
});

export default connect(null, mapDispatchToProps)(PaymentModal);
