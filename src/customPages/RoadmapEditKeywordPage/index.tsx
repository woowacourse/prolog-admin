import { useLocation } from 'react-router-dom';
import SubKeywordList from '../RoadmapTopKeywordsPage/components/SubKeywordList';

const RoadmapEditKeywordPage = () => {
  const { state } = useLocation();
  console.log(state);
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
