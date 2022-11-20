import { useGetTopKeywordList } from '../../hooks/roadmap';
import { useNavigate, useParams } from 'react-router-dom';
import TopKeywordList from './components/TopKeywordList';

const RoadMapSelectTopKeywordPage = () => {
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const { topKeywordList } = useGetTopKeywordList(Number(sessionId));
  console.log('topKeywordList', topKeywordList);

  if (typeof topKeywordList === 'undefined') {
    return <h3>선택하신 세션 {sessionId}에 키워드가 존재하지 않습니다.</h3>;
  }

  return (
    <div>
      <h2>수정할 최상위 키워드 중 선택</h2>
      <TopKeywordList
        rows={topKeywordList}
        onClickMove={(keywordId: number) => {
          navigate(`/roadmap/${sessionId}/${keywordId}`);
        }}
      />
    </div>
  );
};

export default RoadMapSelectTopKeywordPage;
