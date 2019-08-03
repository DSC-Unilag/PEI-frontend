const ErrorHandler = error => {
  switch (error) {
    case 'auth/invalid-email':
      return 'Invalid Email';
    case 'auth/network-request-failed':
      return 'No Internet Connection Detected';
    case 'auth/wrong-password':
      return 'Username Or password Is Incorrect';
    case 'auth/email-already-in-use':
      return 'This Email has already been registered';
    default:
      return 'An error Ocurred';
  }
};
export default ErrorHandler;
