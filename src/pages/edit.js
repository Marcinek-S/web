import React from 'react';
import { useQuery, useMutation } from '@apollo/client';

import NoteForm from '../components/NoteForm';
import { GET_NOTE, GET_ME } from '../gql/query';
import { EDIT_NOTE } from '../gql/mutation';

const EditNote = props => {
  const id = props.match.params.id;

  const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });

  const { data: userdata } = useQuery(GET_ME);

  const [editNote] = useMutation(EDIT_NOTE, {
    variables: {
      id
    },
    onCompleted: () => {
      props.history.push(`/note/${id}`);
    }
  });

  if (loading) return 'Wczytywanie...';

  if (error) return <p>Błąd! Nie znaleziono notatki.</p>;

  if (userdata.me.id !== data.note.author.id) {
    return <p>Nie możesz edytować tej notatki.</p>;
  }

  return <NoteForm content={data.note.content} action={editNote} />;
};

export default EditNote;
