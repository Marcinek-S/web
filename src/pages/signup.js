import React, { useEffect } from 'react';
import { useMutation, useApolloClient, gql } from '@apollo/client';
import styled from 'styled-components';

import UserForm from '../components/UserForm';
import { SIGNUP_USER } from '../gql/mutation';

const SignUp = props => {
  useEffect(() => {
    document.title = 'Rejestracja - Notedly';
  });

  const client = useApolloClient();
  const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
    onCompleted: data => {
      localStorage.setItem('token', data.signUp);
      client.writeData({ data: { isLoggedIn: true } });
      props.history.push('/');
    }
  });

  return (
    <React.Fragment>
      <UserForm action={signUp} formType="signup" />
      {loading && <p>Wczytywanie...</p>}
      {error && <p>Błąd podczas tworzenia konta!</p>}
    </React.Fragment>
  );
};

export default SignUp;
