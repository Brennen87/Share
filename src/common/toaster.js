const TOASTER_MESSAGES = {
  switchRole: {
    title: role => `You are a ${role}`,
    text: roles =>
      `Your role has been successfully changed from an ${roles.old} to  a ${roles.new}.`
  },
  registrationSuccess: {
    title: 'Confirm Your Email',
    text:
      'Your account has been successfully registered.To complete the process please verify your email.'
  },
  registrationFail: 'Could not register user',
  forgotPassword: '  Password reset email has been sent',
  loginSuccess: name => `Welcome back ${name}`,
  loginFail: 'Unable to sign in. Please check email & password',
  resetPasswordFail: 'Could not change the password',
  verifyEmailError: 'Verification code invalid',
  verifyEmailSuccess:
    'Your email has been successfully verified. Please log in with your credentials.',
  somethingWentWrong: 'Something went wrong',
  errorWhileDownloadingFile: 'An error occured while downloading the file. Please try again.'
};

export default TOASTER_MESSAGES;
