import * as React from 'react';
import { Formik } from 'formik';
import ContactListSelect from '../../ContactListSelect';
import InputTextFieldSmall from '../../UI/InputTextFieldSmall';
import TextareaField from '../../UI/TextareaField';
import { Attachment } from '../../UI/Attachment';
import DatePickerCalendar from '../../UI/DatePickerCalendar';
import SmallButton from '../../UI/SmallButton';
import * as Yup from 'yup';
import Preloader from '../../Preloader';
import { accountingFormat, converseToNumber } from '../../../helpers';
import { debounce } from 'lodash';
import Notify from '../../Notification';
import {
  FILL_IN_ALL_REQUIRED_FIELDS,
  TEN_MB_AS_BYTES,
  ATTACHMENTS_LIMIT_TEXT,
  ALLOWED_FORMATS
} from '../../../common/constants';
import * as classnames from 'classnames';

const VALIDATION_SCHEMA = Yup.object().shape({
  vendor: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.number().required()
    })
    .required(),
  title: Yup.string().required(),
  description: Yup.string().required(),
  startDate: Yup.date().required(),
  dueDate: Yup.date().required(),
  attachments: Yup.array(),
  rate: Yup.string().required(),
  cost: Yup.string().required(),
  initialPayment: Yup.string().required()
});

export class ProjectCreateSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAttachmentsUpload: false,
      options: []
    };
  }

  cachedSetFieldValueMethods = {};

  debouncedSetFieldValue = (originalSetFieldValueMethod, fieldName, newValue) => {
    if (!(fieldName in this.cachedSetFieldValueMethods)) {
      this.cachedSetFieldValueMethods[fieldName] = debounce(value => {
        originalSetFieldValueMethod(fieldName, value);
      }, 1000);
    }
    return this.cachedSetFieldValueMethods[fieldName](newValue);
  };

  getSearchResult = res => {
    this.setState({ options: res });
  };

  render() {
    const { summaryState, onSubmit } = this.props;
    const { options } = this.state;
    const nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + 1);

    return (
      <Formik
        enableReinitialize
        validationSchema={VALIDATION_SCHEMA}
        onSubmit={(values, formikBag) => onSubmit(values, formikBag)}
        initialValues={summaryState}
      >
        {({
          values,
          errors,
          handleChange,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          validateForm
        }) => (
          <form className="project_create_summary_form" onSubmit={handleSubmit} autoComplete="off">
            <div className="project_create_summary_form__summary">
              <div className="project_create_summary_form__subtitle">Summary</div>
              <div className="project_create_summary_form__vendor">
                <div className="form_label project_create_summary_form__vendor_label">
                  Vendor name*
                </div>
                <ContactListSelect
                  value={values.vendor}
                  onChange={option => setFieldValue('vendor', option)}
                  onInputChange={res => this.setState({ options: res })}
                  options={this.getSearchResult}
                  className={classnames(
                    !options.length && 'hide_menu',
                    'project_create_summary_form__vendor_select'
                  )}
                />
              </div>
              <InputTextFieldSmall
                name="title"
                value={values.title}
                onChange={handleChange}
                label="Project Title*"
                className="project_create_summary_form__title_input"
                row
                autoComplete="off"
              />
              <TextareaField
                name="description"
                onChange={handleChange}
                value={values.description}
                label="Project Requirements and Details*"
                className="project_create_summary_form__textarea"
              />
              <div className="project_create_summary_form__attachments">
                {values.attachments.map(file => (
                  <Attachment
                    key={file.id}
                    title={file.name}
                    onRemove={() =>
                      setFieldValue(
                        'attachments',
                        values.attachments.filter(attch => attch.id !== file.id)
                      )
                    }
                  />
                ))}
              </div>
              <div className="project_create_summary_form__upload">
                <div className="project_create_summary_form__upload_left">
                  <div className="project_create_summary_form__upload_label">Attachments</div>
                  <div className="project_create_summary_form__upload_desc">
                    (Maximum upload file size is limited to 10MB, allowed file types in the png,
                    jpg, pdf.)
                  </div>
                </div>
                <div className="project_create_summary_form__upload_right">
                  {!this.state.isAttachmentsUpload ? (
                    <>
                      <label htmlFor="file" className="project_create_summary_form__upload_button">
                        Upload a File
                      </label>
                      <input
                        type="file"
                        id="file"
                        accept="image/*|application/pdf"
                        multiple
                        className="project_create_summary_form__upload_input"
                        onChange={e => this.uploadAttachments(e, values.attachments, setFieldValue)}
                      />
                    </>
                  ) : (
                    <Preloader />
                  )}
                </div>
              </div>

              <div className="project_create_summary_form__terms">
                <div className="project_create_summary_form__subtitle">Terms</div>
                <div className="project_create_summary_form__terms__duedate">
                  <div className="project_create_summary_form__terms__duedate_label">Due Date*</div>
                  <DatePickerCalendar
                    value={values.dueDate}
                    minDate={nextDay}
                    className="project_create_summary_form__terms__duedate_calendar"
                    onChange={date => setFieldValue('dueDate', date)}
                  />
                </div>
                <div className="project_create_summary_form__terms__payment">
                  <div className="project_create_summary_form__terms__payment_label">
                    Payment Terms*
                    <span className="project_create_summary_form__terms__payment_label--info">
                      (For information only)
                    </span>
                  </div>
                  <div className="project_create_summary_form__terms__payment_content">
                    <div className="project_create_summary_form__terms__payment_rate">
                      <div className="project_create_summary_form__terms__payment_rate_label">
                        Agreed Rate <span>$</span>
                      </div>
                      <InputTextFieldSmall
                        onChange={e => setFieldValue('rate', e.target.value)}
                        onBlur={e => {
                          setFieldValue(
                            'rate',
                            e.target.value.replace(/(\d.*\d)/g, match =>
                              accountingFormat(match, null)
                            )
                          );
                        }}
                        value={values.rate}
                        name="rate"
                        className="project_create_summary_form__terms__payment_rate_input"
                        row
                      />
                    </div>
                    <div className="project_create_summary_form__terms__payment_total">
                      <div className="project_create_summary_form__terms__payment_total_label">
                        Agreed Total <span>$</span>
                      </div>
                      <InputTextFieldSmall
                        name="cost"
                        className="project_create_summary_form__terms__payment_total_input"
                        row
                        onChange={e => setFieldValue('cost', e.target.value)}
                        onBlur={e =>
                          e.target.value && setFieldValue('cost', accountingFormat(e.target.value))
                        }
                        value={values.cost}
                      />
                    </div>
                  </div>
                </div>

                <div className="project_create_summary_form__terms__payment">
                  <div className="project_create_summary_form__terms__payment_label initial_label">
                    Initial Payment*{' '}
                    <span className="project_create_summary_form__terms__payment_label--info">
                      (The amount that you pay now to start the project)
                    </span>
                  </div>
                  <div className="project_create_summary_form__terms__payment_content">
                    <div className="project_create_summary_form__terms__payment_rate">
                      <div className="project_create_summary_form__terms__payment_rate_label">
                        <span className="project_create_summary_form__terms__payment_rate_label_initial">
                          $
                        </span>
                      </div>
                      <InputTextFieldSmall
                        onChange={e => setFieldValue('initialPayment', e.target.value)}
                        onBlur={e => {
                          setFieldValue(
                            'initialPayment',
                            e.target.value.replace(/(\d.*\d)/g, match =>
                              accountingFormat(match, 2)
                            )
                          );
                        }}
                        value={values.initialPayment}
                        name="initialPayment"
                        className="project_create_summary_form__terms__payment_rate_input"
                        row
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="project_create_summary_form__buttons">
              <SmallButton
                type="button"
                label="Cancel"
                onClick={() => this.props.handleCancel()}
                className="project_create_summary_form__button_cancel"
              />
              <SmallButton
                type="button"
                onClick={() => {
                  validateForm().then(formErrors => {
                    if (Object.keys(formErrors).length) {
                      return Notify.info({ text: FILL_IN_ALL_REQUIRED_FIELDS });
                    }

                    if (
                      !values.cost ||
                      Number.isNaN(converseToNumber(values.cost)) ||
                      converseToNumber(values.cost) < 1
                    ) {
                      return Notify.info({
                        text: 'Please provide a valid number as the Agreed Total.'
                      });
                    }

                    if (
                      !values.initialPayment ||
                      Number.isNaN(converseToNumber(values.initialPayment)) ||
                      converseToNumber(values.initialPayment) < 1 ||
                      converseToNumber(values.initialPayment) > converseToNumber(values.cost)
                    ) {
                      return Notify.info({
                        text: 'Please provide a valid number as the Initial Payment.'
                      });
                    }

                    handleSubmit();
                  });
                }}
                disabled={isSubmitting}
                label="Next"
                className="project_create_summary_form__button_submit"
              />
            </div>
          </form>
        )}
      </Formik>
    );
  }

  uploadAttachments = (e, attachments, setFieldValue) => {
    const files = [...attachments];

    for (let i = 0; i < e.target.files.length; i++) {
      const { type, size } = e.target.files[i];
      if (size > TEN_MB_AS_BYTES) {
        e.preventDefault();
        e.nativeEvent.preventDefault();
        Notify.info({ text: ATTACHMENTS_LIMIT_TEXT });
        this.setState({ isAttachmentsUpload: false });
        return;
      }
      if (!ALLOWED_FORMATS.includes(type)) {
        e.preventDefault();
        e.nativeEvent.preventDefault();
        Notify.info({ text: 'Invalid file format' });
        this.setState({ isAttachmentsUpload: false });
        return;
      }
    }

    this.setState({ isAttachmentsUpload: true });
    Object.keys(e.target.files).map(index => {
      const file = new FormData();
      file.append('file', e.target.files[index]);
      this.props
        .uploadFile(file)
        .then(res => {
          res && res.id && files.push(res);
          this.setState({ isAttachmentsUpload: false });
          setFieldValue('attachments', files);
        })
        .catch(() => {
          this.setState({ isAttachmentsUpload: false });
        });
      return index;
    });
  };
}
