import { useGetTopKeywordList } from '../../../hooks/roadmap';
import { useNavigate, useParams } from 'react-router-dom';
import TopKeywordList from '../../common/TopKeywordList';

const TopKeywords = () => {
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const { topKeywordList } = useGetTopKeywordList(Number(sessionId));
  console.log('topKeywordList', topKeywordList);

  if (typeof topKeywordList === 'undefined') {
    return <h3>선택하신 세션 {sessionId}에 키워드가 존재하지 않습니다.</h3>;
  }

  return (
    <div>
      <h2>키워드 선택</h2>
      <TopKeywordList
        rows={topKeywordList}
        onClickMove={(keywordId: number) => {
          navigate(`/roadmap/${sessionId}/${keywordId}`);
        }}
      />
    </div>
  );
};

export default TopKeywords;
