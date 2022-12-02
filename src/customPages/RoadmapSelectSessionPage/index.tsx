import { useNavigate } from 'react-router-dom';
import { useGetSessions } from '../../hooks/roadmap';
import SessionList from './components/SessionList';

const RoadmapSelectSessionPage = () => {
  const navigate = useNavigate();

  const { sessions } = useGetSessions();

  const selectSession = (sessionId: number) => {
    navigate(`/roadmap/${sessionId}`);
  };

  return (
    <div>
      <h2>세션 선택</h2>
      {sessions && (
        <SessionList rows={sessions} selectSession={selectSession} />
      )}
    </div>
  );
};

export default RoadmapSelectSessionPage;
