import React from 'react';
import { useQuery } from '@apollo/client';

import Note from '../components/Note';
import { GET_NOTE } from '../gql/query';

const NotePage = props => {
  const id = props.match.params.id;

  const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });

  if (loading) return <p>Wczytywanie...</p>;
  // if there is an error fetching the data, display an error message
  if (error) return <p>Błąd! Notatka nie została znalezona</p>;

  // if the data is successful, display the data in our UI
  return <Note note={data.note} />;
};

export default NotePage;
