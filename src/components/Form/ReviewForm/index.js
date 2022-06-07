import * as React from 'react';
import * as classnames from 'classnames';
import StarRating from 'react-svg-star-rating';
import { RATING_STARS_COUNT, RATING_STARS_SIZE } from '../../../common/dicts';
import TextareaField from '../../UI/TextareaField';
import SmallButton from '../../UI/SmallButton';
import { Formik } from 'formik';
import * as Yup from 'yup';
import './index.scss';

const VALIDATION_SCHEMA = Yup.object().shape({
  rate: Yup.number()
    .min(0)
    .required(),
  message: Yup.string().required()
});

const ReviewForm = ({ className, isCustomer, onSubmit }) => {
  return (
    <Formik
      validationSchema={VALIDATION_SCHEMA}
      initialValues={{
        rate: 0,
        message: ''
      }}
      onSubmit={values => onSubmit(values)}
    >
      {({ values, setFieldValue, handleChange, handleSubmit }) => (
        <form
          className={classnames(
            'review_form',
            isCustomer ? 'review_form__customer' : 'review_form__vendor',
            className
          )}
          onSubmit={handleSubmit}
        >
          <div className="review_form__rate">
            <div className="review_form__label">{isCustomer ? 'Rate Vendor' : 'Rate Customer'}</div>
            <div className="review_form__rating">
              <StarRating
                initialRating={values.rate}
                size={RATING_STARS_SIZE}
                count={RATING_STARS_COUNT}
                activeColor="#FF8C00"
                handleOnClick={value => setFieldValue('rate', value)}
                isHalfRating
              />
            </div>
          </div>

          <div className="review_form__review">
            <TextareaField
              label={isCustomer ? 'Review Vendor' : 'Review Customer'}
              name="message"
              value={values.message}
              onChange={handleChange}
            />
          </div>

          <div className="review_form__buttons">
            <SmallButton
              className={isCustomer ? 'review_form__submit_customer' : 'review_form__submit_vendor'}
              label={isCustomer ? 'Accept and Review' : 'Submit Review'}
              type="submit"
              onSubmit={handleSubmit}
              disabled={!values.message || !values.rate}
            />
          </div>
        </form>
      )}
    </Formik>
  );
};

export default ReviewForm;
