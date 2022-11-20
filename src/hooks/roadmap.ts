import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { client } from '../client';

const QUERY_KEY = {
  sessions: 'sessions',
  keyword: 'keyword',
  topKeywordList: 'topKeywordList',
  childKeywordList: 'childKeywordList',
  quizListByKeyword: 'quizListByKeyword',
  deleteKeyword: 'deleteKeyword',
};

export const getSessions = async () => {
  const response = await client.get<Session[]>('/sessions');

  return response.data;
};

export const useGetSessions = () => {
  const { data } = useQuery([QUERY_KEY.sessions], () => getSessions());

  return {
    sessions: data,
  };
};

export const getKeyword = async ({ sessionId, keywordId }: KeywordRequest) => {
  const response = await client.get<KeywordResponse>(
    `/sessions/${sessionId}/keywords/${keywordId}`
  );

  return response.data;
};

export const useGetKeyword = ({
  sessionId,
  keywordId,
}: {
  sessionId: number;
  keywordId: number;
}) => {
  const { data } = useQuery([QUERY_KEY.keyword], () =>
    getKeyword({
      sessionId,
      keywordId,
    })
  );

  return {
    keyword: data,
  };
};

// 5. 세션별 Keyword 목록 조회
export const getTopKeywordList = async (sessionId: number) => {
  const response = await client.get<KeywordListResponse>(
    `/sessions/${sessionId}/keywords`
  );

  return response.data;
};

export const useGetTopKeywordList = (sessionId: number) => {
  const { data } = useQuery([QUERY_KEY.topKeywordList], () =>
    getTopKeywordList(sessionId)
  );

  return {
    topKeywordList: data?.data,
  };
};

// 6-1. [R] 최상위 Keyword의 모든 자식 Keyword 목록 조회(public)
export const getChildKeywordList = async ({
  sessionId,
  keywordId,
}: ChildKeywordListRequest) => {
  const response = await client.get<KeywordListResponse>(
    `/sessions/${sessionId}/keywords/${keywordId}/children`
  );

  return response.data;
};

export const useGetChildrenKeywordList = ({
  sessionId,
  keywordId,
}: ChildKeywordListRequest) => {
  const { data, refetch } = useQuery([QUERY_KEY.childKeywordList], () =>
    getChildKeywordList({
      sessionId,
      keywordId,
    })
  );

  return {
    childrenKeywordList: data?.data,
    refetchChildrenKeywordList: refetch,
  };
};

// 10. [R] Keyword별 Quiz 목록 조회(public)
export const getQuizListByKeyword = async ({
  sessionId,
  keywordId,
}: QuizListByKeywordRequest) => {
  const response = await client.get<QuizListResponse>(
    `/sessions/${sessionId}/keywords/${keywordId}/quizs`
  );

  return response.data;
};

export const useGetQuizListByKeyword = ({
  sessionId,
  keywordId,
}: QuizListByKeywordRequest) => {
  const { data } = useQuery([QUERY_KEY.quizListByKeyword], () =>
    getQuizListByKeyword({
      sessionId,
      keywordId,
    })
  );

  return {
    quizList: data?.data,
  };
};

// 2. [D] Keyword 삭제(admin)
export const deleteKeyword = ({ sessionId, keywordId }: DeleteKeywordRequest) =>
  client.delete(`/sessions/${sessionId}/keywords/${keywordId}`);

export const useDeleteKeyword = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ sessionId, keywordId }: DeleteKeywordRequest) =>
      deleteKeyword({ sessionId, keywordId }),
    {
      onSuccess() {
        queryClient.invalidateQueries([QUERY_KEY.childKeywordList]);
      },
    }
  );
};

// 3. [U] Keyword 수정(admin)
export const editKeyword = ({
  sessionId,
  keywordId,
  name,
  order,
  importance,
  parentKeywordId,
  description,
}: EditKeywordRequest) =>
  client.put(`/sessions/${sessionId}/keywords/${keywordId}`, {
    name,
    order,
    importance,
    parentKeywordId,
    description,
  });

export const useEditKeyword = ({
  successCallback,
}: {
  successCallback?: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation(
    ({
      sessionId,
      keywordId,
      name,
      order,
      importance,
      parentKeywordId,
      description,
    }: EditKeywordRequest) =>
      editKeyword({
        sessionId,
        keywordId,
        name,
        order,
        importance,
        parentKeywordId,
        description,
      }),
    {
      onSuccess() {
        queryClient.invalidateQueries([QUERY_KEY.childKeywordList]);
        successCallback && successCallback();
      },
    }
  );
};

/////////////////////////////////////
// 타입
// Request
export interface Session {
  id: number;
  name: string;
}

type SessionAndKeywordId = {
  sessionId: number;
  keywordId: number;
};

export type KeywordRequest = SessionAndKeywordId;
export type ChildKeywordListRequest = SessionAndKeywordId;
export type QuizListByKeywordRequest = SessionAndKeywordId;
export type DeleteKeywordRequest = SessionAndKeywordId;
export type EditKeywordRequest = SessionAndKeywordId & {
  name: string;
  order: number;
  importance: number;
  parentKeywordId: number | null;
  description: string;
};

// Response

export interface KeywordResponse {
  name: string;
  keywordId: number;
  order: number;
  importance: number;
  parentKeywordId: number;
  description: string;
  childrenKeywords: KeywordResponse[] | null;
}

export interface KeywordListResponse {
  data: KeywordResponse[];
}

export interface Quiz {
  quizId: number;
  question: string;
}

export interface QuizListResponse {
  data: Quiz[];
}
