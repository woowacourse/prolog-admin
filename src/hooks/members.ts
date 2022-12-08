import { useQuery } from '@tanstack/react-query';
import { client } from '../client';

interface Member {
  id: number;
  username: string;
  nickname: string;
  role: 'CREW' | 'COACH' | 'NORMAL';
  imageUrl: string;
}

interface GetMembersProps {
  data: Member[];
  totalSize: number;
  totalPage: number;
  currPage: number;
}

const getMembers = () => {
  return client.get<GetMembersProps>('/members').then((res) => res.data);
};

export const useGetMembers = () => {
  return useQuery<GetMembersProps>(['members'], getMembers);
};
