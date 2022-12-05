import { useGetChildrenKeywordList } from '../../hooks/roadmap';
import { Navigate, useParams } from 'react-router-dom';
import SubKeywordList from '../RoadmapEditKeywordPage/components/SubKeywordList';

const RoadmapTopKeywordsPage = () => {
  const { sessionId, keywordId } = useParams();
  const { childrenKeywordList, isError } = useGetChildrenKeywordList({
    sessionId: Number(sessionId),
    keywordId: Number(keywordId),
  });

  if (isError) {
    return <Navigate to={`/roadmap/${sessionId}`} />;
  }

  return (
    <div>
      <h2>최상위 키워드 수정/삭제</h2>
      {childrenKeywordList && (
        <SubKeywordList childrenKeywordList={[childrenKeywordList]} />
      )}
      <br />
    </div>
  );
};

export default RoadmapTopKeywordsPage;
