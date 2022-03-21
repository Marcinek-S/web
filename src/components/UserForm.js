import React, { useState } from 'react';
import styled from 'styled-components';

import Button from '../components/Button';

const Wrapper = styled.div`
  border: 1px solid #f5f4f0;
  max-width: 500px;
  padding: 1em;
  margin: 0 auto;
`;

const Form = styled.form`
  label,
  input {
    display: block;
    line-height: 2em;
  }
  input {
    width: 100%;
    margin-bottom: 1em;
  }
`;

const UserForm = props => {
  const [values, setValues] = useState();

  const onChange = event => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <Wrapper>
      {props.formType === 'signup' ? <h2>Rejestracja</h2> : <h2>Logowanie</h2>}
      <Form
        onSubmit={event => {
          event.preventDefault();
          props.action({
            variables: {
              ...values
            }
          });
        }}
      >
        {props.formType === 'signup' && (
          <React.Fragment>
            <label htmlFor="username">Nazwa użytkownika: </label>
            <input
              required
              type="text"
              name="username"
              id="username"
              placeholder="Nazwa użytkownika"
              onChange={onChange}
            />
          </React.Fragment>
        )}
        <label htmlFor="email">Adres e-mail: </label>
        <input
          required
          type="email"
          name="email"
          id="email"
          placeholder="Adres e-mail"
          onChange={onChange}
        />
        <label htmlFor="password">Hasło: </label>
        <input
          required
          type="password"
          name="password"
          id="password"
          placeholder="Hasło"
          onChange={onChange}
        />
        <Button type="submit">Wyślij</Button>
      </Form>
    </Wrapper>
  );
};

export default UserForm;
