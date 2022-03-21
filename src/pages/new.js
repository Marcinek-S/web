import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';

import NoteForm from '../components/NoteForm';
import { NEW_NOTE } from '../gql/mutation';
import { GET_MY_NOTES, GET_NOTES } from '../gql/query';

const NewNote = props => {
  useEffect(() => {
    document.title = 'Nowa Notatka - Notedly';
  });

  const [data, { loading, error }] = useMutation(NEW_NOTE, {
    refetchQueries: [{ query: GET_MY_NOTES }, { query: GET_NOTES }],
    onCompleted: data => {
      props.history.push(`note/${data.newNote.id}`);
    }
  });

  return (
    <React.Fragment>
      {loading && <p>Wczytywanie...</p>}

      {error && <p>Błąd podczas zapisywania notatki.</p>}

      <NoteForm action={data} />
    </React.Fragment>
  );
};

export default NewNote;
