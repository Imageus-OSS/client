import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LandingCard from './LandingCard.jsx';
import TextInput from '../TextInput.jsx';
import Button from '../Button.jsx';
import '../../scss/landing.scss';
// import API from '../../api/API';

/// callBack should be passed from landing page. Used to re-render the landing page
/// with the default landing page card, which should be the login card.

function ForgotPassword({ switchCard }) {
  // Leaving input as stateless since it should probably reset if user goes back
  // to login.
  let input;
  const [err, setError] = useState(null);

  function sendResetEmail(event) {
    event.preventDefault();
    setError('Not Implemented');
  }

  return (
    <LandingCard title='Password reset' error={err}>
      <form onSubmit={sendResetEmail}>
        <TextInput
          placeHolder="johndoe@email.com"
          // eslint-disable-next-line no-unused-vars
          onChange={(c) => { input = c; }}
        />
        <Button type='submit'>
          Send Reset Email
        </Button>
        <Button className="btn-link" onClick={() => switchCard('login')}>Back To Login</Button>
      </form>
    </LandingCard>
  );
}

ForgotPassword.propTypes = {
  switchCard: PropTypes.func.isRequired,
};

export default ForgotPassword;
