import { Button } from '@mui/material';
import useModal from '../../hooks/useModal';
import SessionList from './components/SessionList';
import SessionModal from './components/SessionModal';

const RoadmapSelectSessionPage = () => {
  const { open, openModal, closeModal } = useModal();

  return (
    <div>
      <h2>세션 선택</h2>
      <SessionList />
      <Button
        onClick={openModal}
        variant="contained"
        fullWidth
        size="large"
        color="success"
      >
        세션 추가
      </Button>
      <SessionModal open={open} onClose={closeModal} />
    </div>
  );
};

export default RoadmapSelectSessionPage;
