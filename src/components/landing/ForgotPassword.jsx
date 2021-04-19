import React, { useState } from 'react';
import { notification } from 'antd';
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
  let input = '';
  const [err, setError] = useState(null);

  function isTrimmedEmpty(str) {
    if (str.trim() === '') {
      return true;
    }
    return false;
  }

  async function onSubmit(event) {
    event.preventDefault();
    try {
      if (isTrimmedEmpty(input) === false) {
        // await API.passwordRecovery(input);
        notification.success({
          description: 'Please check your email for the password reset link.',
        });
        setError('');
      } else {
        throw (new Error('Email field cannot be empty.'));
      }
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <LandingCard title='Password reset' error={err}>
      <form onSubmit={onSubmit}>
        <TextInput
          placeHolder="johndoe@email.com"
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
