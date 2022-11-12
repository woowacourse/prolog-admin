import { useQuery } from '@tanstack/react-query';
import { client } from '../client';

const updatePopularStudylogs = () => {
  client.get('/studylogs/popular/sync');
};

export const useGetPopularStudylogs = () => {
  return useQuery(['popularStudylogs'], updatePopularStudylogs, {
    enabled: false,
  });
};
