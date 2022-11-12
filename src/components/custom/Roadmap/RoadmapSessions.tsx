import { useGetSessions } from '../../../hooks/roadmap';
import MuiList from '../../common/MuiList';

const RoadmapSessions = () => {
  const { sessions } = useGetSessions();

  return sessions ? (
    <MuiList
      rows={sessions}
      onClickMove={(id: number) => {
        console.log('move');
      }}
    />
  ) : (
    <div></div>
  );
};

export default RoadmapSessions;
