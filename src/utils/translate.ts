const columnNameTranslator = {
  // Keyword
  id: 'Id',
  sessionId: '세션 Id',
  name: '이름',
  keywordId: '키워드 Id',
  order: '순서',
  importance: '중요도(1-5)',
  parentKeywordId: '상위 키워드의 Id',
  description: '설명',
  childrenKeywords: '하위 키워드',

  // Quiz
  quizId: '퀴즈 Id',
  question: '질문',
};

export const translateColumns = (obj: Record<PropertyKey, unknown>) => {
  return Object.keys(obj).map(
    (key) => (columnNameTranslator as Record<string, string>)[key]
  );
};
