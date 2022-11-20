import { useGetChildrenKeywordList } from '../../hooks/roadmap';
import { useParams } from 'react-router-dom';
import SubKeywordList from './components/SubKeywordList';

const RoadmapSubKeywordsPage = () => {
  const { sessionId, keywordId } = useParams();
  const {childrenKeywordList}= useGetChildrenKeywordList({
    sessionId: Number(sessionId),
    keywordId: Number(keywordId),
  });

  console.log(childrenKeywordList);
  if (typeof childrenKeywordList === 'undefined') {
    return <h3>선택하신 최상위 키워드 {keywordId}에 키워드가 존재하지 않습니다.</h3>;
  }

  return (
    <div>
      <h2>키워드 수정/편집/삭제</h2>
      <SubKeywordList
        childrenKeywordList={childrenKeywordList}
      />
    </div>
  );
};

export default RoadmapSubKeywordsPage;
