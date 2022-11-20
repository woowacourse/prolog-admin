import { useGetChildrenKeywordList } from '../../hooks/roadmap';
import { useParams } from 'react-router-dom';
import SubKeywordList from '../RoadmapEditKeywordPage/components/SubKeywordList';

const RoadmapTopKeywordsPage = () => {
  const { sessionId, keywordId } = useParams();
  const { childrenKeywordList } = useGetChildrenKeywordList({
    sessionId: Number(sessionId),
    keywordId: Number(keywordId),
  });

  console.log(childrenKeywordList);
  if (typeof childrenKeywordList === 'undefined') {
    return <h3>선택하신 최상위 키워드에 콘텐츠가 존재하지 않습니다.</h3>;
  }

  return (
    <div>
      <h2>최상위 키워드 수정/삭제</h2>
      <SubKeywordList
        childrenKeywordList={childrenKeywordList}
        sessionId={Number(sessionId)}
      />
    </div>
  );
};

export default RoadmapTopKeywordsPage;
