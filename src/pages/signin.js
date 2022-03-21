import React, { useEffect } from 'react';
import { useMutation, useApolloClient, gql } from '@apollo/client';

import UserForm from '../components/UserForm';
import { SIGNIN_USER } from '../gql/mutation';

const SignIn = props => {
  useEffect(() => {
    document.title = 'Logowanie - Notedly';
  });

  const client = useApolloClient();
  const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
    onCompleted: data => {
      localStorage.setItem('token', data.signIn);
      client.writeData({ data: { isLoggedIn: true } });
      props.history.push('/');
    }
  });

  return (
    <React.Fragment>
      <UserForm action={signIn} formType="signIn" />
      {loading && <p>Wczytywanie...</p>}
      {error && <p>Błąd podczas logowania!</p>}
    </React.Fragment>
  );
};

export default SignIn;
