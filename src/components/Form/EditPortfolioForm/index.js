import React from 'react';
import { Formik } from 'formik';
import SmallButton from '../../UI/SmallButton';
import { readURL } from '../../../helpers';
import { ALLOWED_FORMATS } from '../../../common/constants';
import './index.scss';

const EditPortfolioForm = ({ portfolio, onSubmit, edit, onClose }) => {
  return (
    <Formik
      enableReinitialize
      initialValues={{
        ...portfolio,
        imageUrl: portfolio.normalized ?? portfolio.file
      }}
      onSubmit={(values, formikBag) => onSubmit(values, formikBag)}
    >
      {({ values, handleChange, handleSubmit, isSubmitting, setFieldValue, submitForm }) => (
        <form className="portfolio_modal_form" onSubmit={handleSubmit}>
          <div className="portfolio_modal_form__img">
            {edit && (
              <div className="portfolio_modal_form__img__actions">
                <label htmlFor="file" />
                <span
                  onClick={() => {
                    setFieldValue('file', null);
                    submitForm();
                  }}
                />
                <input
                  type="file"
                  name="file"
                  id="file"
                  onChange={e => {
                    const { type } = e.target.files[0];
                    if (ALLOWED_FORMATS.includes(type)) {
                      setFieldValue([e.target.name], e.target.files[0]);
                      readURL(e.target.files[0]).then(res => {
                        setFieldValue('imageUrl', res);
                      });
                    }
                  }}
                />
              </div>
            )}

            {values.imageUrl && <img src={typeof(values.imageUrl) === 'string' ? values.imageUrl : values.imageUrl.url} alt={values.title} />}
          </div>

          <div className="portfolio_modal_form__inputs">
            <input
              type="text"
              name="title"
              className="portfolio_modal_form__title"
              value={values.title}
              onChange={handleChange}
              disabled={!edit}
            />

            <textarea
              rows="5"
              name="description"
              className="portfolio_modal_form__description"
              value={values.description}
              onChange={handleChange}
              disabled={!edit}
            />
          </div>

          {edit && (
            <div className="portfolio_modal_form__buttons">
              <SmallButton label="Cancel" onClick={onClose} disabled={isSubmitting} />

              <SmallButton
                type="submit"
                label="Save"
                onClick={handleSubmit}
                disabled={isSubmitting}
              />
            </div>
          )}
        </form>
      )}
    </Formik>
  );
};

export default EditPortfolioForm;
