import { Button } from '@mui/material';
import useModal from '../../hooks/useModal';
import CurriculumList from './components/CurriculumList';
import CurriculumModal from './components/CurriculumModal';

const RoadmapSelectCurriculumPage = () => {
  const { open, openModal, closeModal } = useModal();

  return (
    <div>
      <h2>커리큘럼 선택</h2>
      <CurriculumList />
      <Button
        onClick={openModal}
        variant="contained"
        fullWidth
        size="large"
        color="success"
      >
        커리큘럼 추가
      </Button>
      {/* 상태 초기화를 위하여 open 조건문 추가 */}
      {open && <CurriculumModal open={open} onClose={closeModal} />}
    </div>
  );
};

export default RoadmapSelectCurriculumPage;
