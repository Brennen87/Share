import * as React from 'react';
import DocumentTitle from '../../components/DocumentTitle';
import FeedbackForm from '../../components/Form/FeedbackForm';
import { connect } from 'react-redux';
import { 
  resetFeedback as resetFeedbackAction,
  sendFeedback as sendFeedbackAction } from '../../store/actions/commonActions';
import './index.scss';
import Preloader from '../../components/Preloader/index';
import Button from '../../components/UI/Button';

const FeedbackPage = ({ route, sendFeedback, resetFeedback, feedbackEmailSending }) => {
  const onSubmit = async values => {
    const form = new FormData();
    const fullname = `${values.firstname} ${values.lastname}`;
    form.append('name', fullname);
    form.append('email', values.email);
    form.append('category', (values.category && values.category.label) || '');
    form.append('subject', values.subject);
    form.append('message', values.message);
    if (values.attachment) {
      form.append('attachment', values.attachment);
    }

    await sendFeedback(form);
  };

  const { loading, data } = feedbackEmailSending;

  const resetPage = () => {
    console.log("'Done' button clicked");
    resetFeedback();
  };

  return (
    <DocumentTitle title={route.pageTitle}>
      <div className="feedback_page">
        {!loading && !data ? (
          <FeedbackForm onSubmit={onSubmit} />
        ) : (
          <div className="feedback_page__content-container">
            <h1 className="feedback_page__thank-you-title">{loading ? "Feedback and Support" : "Thank you"}</h1>

            {loading ? (
              <Preloader className="feedback_page__preloader" />
            ) : (
              <>
                {data && (
                  <div className="feedback_page__thank-you-content">
                    <h2 className="feedback_page__thank-you-subtitle">
                      Your message has been successfully sent.
                    </h2>
                    <Button
                      label="Done"
                      onClick={resetPage}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </DocumentTitle>
  );
};

const mapStateToProps = state => ({
  feedbackEmailSending: state.commonStore.feedbackEmailSending
});

const mapDispatchToProps = dispatch => ({
  sendFeedback: payload => dispatch(sendFeedbackAction(payload)),
  resetFeedback: () => dispatch(resetFeedbackAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackPage);
