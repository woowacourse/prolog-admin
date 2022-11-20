import { useLocation } from 'react-router-dom';
import SubKeywordList from './components/SubKeywordList';

const RoadmapEditKeywordPage = () => {
  const { state } = useLocation();

  return (
    <div>
      <h2>[{state.name}] 하위 키워드 수정/삭제</h2>
      <SubKeywordList
        childrenKeywordList={state.childrenKeywordList}
        sessionId={state.sessionId}
      />
    </div>
  );
};

export default RoadmapEditKeywordPage;
