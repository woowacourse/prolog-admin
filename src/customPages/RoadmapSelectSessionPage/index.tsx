import { useNavigate } from 'react-router-dom';
import { useGetSessions } from '../../hooks/roadmap';
import SessionList from './components/SessionList';

const RoadmapSelectSessionPage = () => {
  const { sessions } = useGetSessions();
  const navigate = useNavigate();

  if (typeof sessions === 'undefined') {
    return <h3>세션이 존재하지 않습니다</h3>;
  }

  return (
    <div>
      <h2>세션 선택</h2>
      <SessionList
        rows={sessions}
        onClickMove={(sessionId: number) => {
          navigate(`/roadmap/${sessionId}`);
        }}
      />
    </div>
  );
};

export default RoadmapSelectSessionPage;