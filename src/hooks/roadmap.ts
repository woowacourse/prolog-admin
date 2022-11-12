import { useQuery } from '@tanstack/react-query';
import { client } from '../client';

const QUERY_KEY = {
  sessions: 'sessions',
  keyword: 'keyword',
  topKeywordList: 'topKeywordList',
  childKeywordList: 'childKeywordList',
  quizListByKeyword: 'quizListByKeyword',
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

// 5번 세션별 Keyword 목록 조회
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
}: {
  sessionId: number;
  keywordId: number;
}) => {
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
}: {
  sessionId: number;
  keywordId: number;
}) => {
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
