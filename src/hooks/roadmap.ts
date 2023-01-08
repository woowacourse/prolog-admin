import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { client } from '../client';

const QUERY_KEY = {
  sessions: 'sessions',
  keyword: 'keyword',
  topKeywordList: 'topKeywordList',
  childKeywordList: 'childKeywordList',
  quizListByKeyword: 'quizListByKeyword',
  deleteKeyword: 'deleteKeyword',
  curriculums: 'curriculums',
};

// Curriculum

export type Curriculum = {
  id: number;
  name: string;
};

export const getCurriculums = async () => {
  const response = await client.get<{ data: Curriculum[] }>('/curriculums');

  return response.data;
};

export const useGetCurriculums = () => {
  const { data } = useQuery([QUERY_KEY.curriculums], () => getCurriculums());

  return {
    curriculums: data?.data,
  };
};

type CurriculumRequest = {
  name: string;
};

export const addCurriculum = async (body: CurriculumRequest) => {
  const response = await client.post('/curriculums', body);

  return response.data;
};

export const useAddCurriculumMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(addCurriculum, {
    onSuccess() {
      queryClient.invalidateQueries([QUERY_KEY.curriculums]);
    },
  });
};

export const editCurriculum = async (id: number, body: CurriculumRequest) => {
  const response = await client.put(`/curriculums/${id}`, body);

  return response.data;
};

export const useEditCurriculumMutation = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation((body: CurriculumRequest) => editCurriculum(id, body), {
    onSuccess() {
      queryClient.invalidateQueries([QUERY_KEY.curriculums]);
    },
  });
};

export const deleteCurriculum = async (id: number) => {
  const response = await client.delete(`/curriculums/${id}`);

  return response.data;
};

export const useDeleteCurriculumMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteCurriculum, {
    onSuccess() {
      queryClient.invalidateQueries([QUERY_KEY.curriculums]);
    },
  });
};

// Session

export const getSessions = async (curriculumId: number) => {
  const response = await client.get<{ sessions: Session[] }>(
    `/curriculums/${curriculumId}/sessions`
  );

  return response.data;
};

export const useGetSessions = (curriculumId: number) => {
  const { data } = useQuery([QUERY_KEY.sessions], () =>
    getSessions(curriculumId)
  );

  return {
    sessions: data?.sessions,
  };
};

type SessionRequest = {
  name: string;
};

// 백엔드와 상의후 불필요한 curriculumId 제거
export const addSession = async (
  curriculumId: number,
  body: SessionRequest
) => {
  const response = await client.post(
    `/curriculums/${curriculumId}/sessions`,
    body
  );

  return response.data;
};

export const useAddSessionMutation = (curriculumId: number) => {
  const queryClient = useQueryClient();

  return useMutation((body: SessionRequest) => addSession(curriculumId, body), {
    onSuccess() {
      queryClient.invalidateQueries([QUERY_KEY.sessions]);
    },
  });
};

// 백엔드와 상의후 불필요한 curriculumId 제거
export const editSession = async (
  curriculumId: number,
  id: number,
  body: SessionRequest
) => {
  const response = await client.put(
    `/curriculums/${curriculumId}/sessions/${id}`,
    body
  );

  return response.data;
};

export const useEditSessionMutation = (id: number, curriculumId: number) => {
  const queryClient = useQueryClient();

  return useMutation(
    (body: SessionRequest) => editSession(curriculumId, id, body),
    {
      onSuccess() {
        queryClient.invalidateQueries([QUERY_KEY.sessions]);
      },
    }
  );
};

// 백엔드와 상의후 불필요한 curriculumId 제거
export const deleteSession = async (curriculumId: number, id: number) => {
  const response = await client.delete(
    `/curriculums/${curriculumId}/sessions/${id}`
  );

  return response.data;
};

export const useDeleteSessionMutation = (curriculumId: number) => {
  const queryClient = useQueryClient();

  return useMutation((id: number) => deleteSession(curriculumId, id), {
    onSuccess() {
      queryClient.invalidateQueries([QUERY_KEY.sessions]);
    },
  });
};

// Keyword

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
  const { data } = useQuery([QUERY_KEY.keyword, sessionId, keywordId], () =>
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
  const response = await client.get<TopKeywordListResponse>(
    `/sessions/${sessionId}/keywords`
  );

  return response.data;
};

export const useGetTopKeywordList = (sessionId: number) => {
  const { data } = useQuery([QUERY_KEY.topKeywordList, sessionId], () =>
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
  const response = await client.get<KeywordResponse>(
    `/sessions/${sessionId}/keywords/${keywordId}/children`
  );

  return response.data;
};

export const useGetChildrenKeywordList = ({
  sessionId,
  keywordId,
}: ChildKeywordListRequest) => {
  const { data, refetch, isError } = useQuery(
    [QUERY_KEY.childKeywordList, sessionId],
    () =>
      getChildKeywordList({
        sessionId,
        keywordId,
      })
  );

  return {
    childrenKeywordList: data,
    refetchChildrenKeywordList: refetch,
    isError,
  };
};

const normalizeKeyword = (topKeyword: KeywordResponse) => {
  const result: KeywordResponse[] = [];
  result.push(topKeyword);

  const pushAllChildren = (keyword: KeywordResponse) => {
    keyword.childrenKeywords?.forEach((k) => {
      result.push(k);
      if (k.childrenKeywords) {
        pushAllChildren(k);
      }
    });
  };

  pushAllChildren(topKeyword);

  return result;
};

export const useSelectedKeyword = ({
  sessionId,
  keywordId,
  selectedKeywordId,
}: ChildKeywordListRequest & { selectedKeywordId: number }) => {
  const { data } = useQuery(
    [QUERY_KEY.childKeywordList, sessionId],
    () =>
      getChildKeywordList({
        sessionId,
        keywordId,
      }),
    {
      select(data) {
        const normarlizedKeywordList = normalizeKeyword(data);

        return normarlizedKeywordList.find(
          (k) => k.keywordId === selectedKeywordId
        );
      },
    }
  );
  // 발견할 때 까지 찾는다.

  return {
    selectedKeyword: data,
  };
};

// Quiz

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
  const { data } = useQuery(
    [QUERY_KEY.quizListByKeyword, sessionId, keywordId],
    () =>
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

  return useMutation(deleteKeyword, {
    onSuccess(_, { sessionId }) {
      queryClient.invalidateQueries([QUERY_KEY.childKeywordList, sessionId]);
    },
  });
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

export const useEditKeyword = () => {
  const queryClient = useQueryClient();

  return useMutation(editKeyword, {
    onSuccess(_, { sessionId }) {
      queryClient.invalidateQueries([QUERY_KEY.childKeywordList, sessionId]);
    },
  });
};

// 1. [C] Keyword 생성(admin)
export const addKeyword = ({
  sessionId,
  name,
  order,
  importance,
  parentKeywordId,
  description,
}: AddKeywordRequest) =>
  client.post(`/sessions/${sessionId}/keywords`, {
    name,
    order,
    importance,
    parentKeywordId,
    description,
  });

export const useAddKeyword = () => {
  const queryClient = useQueryClient();

  return useMutation(addKeyword, {
    onSuccess(_, { sessionId }) {
      queryClient.invalidateQueries([QUERY_KEY.topKeywordList, sessionId]);
      queryClient.invalidateQueries([QUERY_KEY.childKeywordList, sessionId]);
    },
  });
};

type AddQuizRequest = {
  sessionId: number;
  keywordId: number;
  question: string;
};

export const addQuiz = ({ sessionId, keywordId, question }: AddQuizRequest) =>
  client.post(`/sessions/${sessionId}/keywords/${keywordId}/quizs`, {
    question,
  });

export const useAddQuiz = ({
  sessionId,
  keywordId,
}: Pick<AddQuizRequest, 'sessionId' | 'keywordId'>) => {
  const queryClient = useQueryClient();

  return useMutation(
    (question: Pick<AddQuizRequest, 'question'>['question']) =>
      addQuiz({
        sessionId,
        keywordId,
        question,
      }),
    {
      onSuccess() {
        queryClient.invalidateQueries([
          QUERY_KEY.quizListByKeyword,
          sessionId,
          keywordId,
        ]);
      },
    }
  );
};

type EditQuizRequest = {
  sessionId: number;
  keywordId: number;
  quiz: Quiz;
};

export const editQuiz = ({ sessionId, keywordId, quiz }: EditQuizRequest) =>
  client.put(
    `/sessions/${sessionId}/keywords/${keywordId}/quizs/${quiz.quizId}`,
    {
      question: quiz.question,
    }
  );

export const useEditQuiz = ({
  sessionId,
  keywordId,
}: Pick<EditQuizRequest, 'sessionId' | 'keywordId'>) => {
  const queryClient = useQueryClient();

  return useMutation(
    (quiz: Pick<EditQuizRequest, 'quiz'>['quiz']) =>
      editQuiz({
        sessionId,
        keywordId,
        quiz,
      }),
    {
      onSuccess() {
        queryClient.invalidateQueries([
          QUERY_KEY.quizListByKeyword,
          sessionId,
          keywordId,
        ]);
      },
    }
  );
};

type DeleteQuizRequest = {
  sessionId: number;
  keywordId: number;
  quizId: number;
};

export const deleteQuiz = ({
  sessionId,
  keywordId,
  quizId,
}: DeleteQuizRequest) =>
  client.delete(`/sessions/${sessionId}/keywords/${keywordId}/quizs/${quizId}`);

export const useDeleteQuiz = ({
  sessionId,
  keywordId,
}: Pick<DeleteQuizRequest, 'sessionId' | 'keywordId'>) => {
  const queryClient = useQueryClient();

  return useMutation(
    (quizId: Pick<DeleteQuizRequest, 'quizId'>['quizId']) =>
      deleteQuiz({
        sessionId,
        keywordId,
        quizId,
      }),
    {
      onSuccess() {
        queryClient.invalidateQueries([
          QUERY_KEY.quizListByKeyword,
          sessionId,
          keywordId,
        ]);
      },
    }
  );
};

/////////////////////////////////////
// 타입
// Request
export type Session = {
  sessionId: number;
  name: string;
};

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

export type AddKeywordRequest = {
  sessionId: number;
  name: string;
  order: number;
  importance: number;
  parentKeywordId: number | null;
  description: string;
};

// Response

export type KeywordResponse = {
  name: string;
  keywordId: number;
  order: number;
  importance: number;
  parentKeywordId: number;
  description: string;
  childrenKeywords: KeywordResponse[] | null;
};

export type TopKeywordResponse = KeywordResponse & { childrenKeywords: null };

export interface KeywordListResponse {
  data: KeywordResponse[];
}

export interface TopKeywordListResponse {
  data: TopKeywordResponse[];
}

export type Quiz = {
  quizId: number;
  question: string;
};

export interface QuizListResponse {
  data: Quiz[];
}
