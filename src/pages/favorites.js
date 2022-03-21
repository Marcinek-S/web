import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import NoteFeed from '../components/NoteFeed';
import { GET_MY_FAVORITES } from '../gql/query';

const Favorites = () => {
  useEffect(() => {
    document.title = 'Favorites — Notedly';
  });

  const { loading, error, data } = useQuery(GET_MY_FAVORITES);

  if (loading) return 'Wczytywanie...';

  if (error) return `Błąd! ${error.message}`;

  if (data.me.favorites.length !== 0) {
    return <NoteFeed notes={data.me.favorites} />;
  } else {
    return <p>Brak ulubionych notatek.</p>;
  }
};

export default Favorites;
