import * as React from 'react';
import Preloader from '../../components/Preloader';
import { connect } from 'react-redux';
import { verifyUserEmail } from '../../store/actions/authActions';

class VerifyEmailPage extends React.Component {
  componentDidMount() {
    const { key } = this.props.match.params;
    this.props.verifyUserEmail(key);
  }

  render() {
    return <Preloader />;
  }
}

const mapDispatchToProps = dispatch => ({
  verifyUserEmail: key => dispatch(verifyUserEmail(key))
});

export default connect(null, mapDispatchToProps)(VerifyEmailPage);
