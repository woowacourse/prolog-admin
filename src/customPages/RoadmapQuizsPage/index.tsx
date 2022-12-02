import { useLocation } from 'react-router-dom';
import { KeywordResponse } from '../../hooks/roadmap';
import { Button } from '@mui/material';
import QuizList from './QuizList';
import useModal from '../../hooks/useModal';
import QuizModal from './QuizModal';

const RoadmapQuizsPage = () => {
  const keyword = useLocation().state as KeywordResponse;

  const { open, openModal, closeModal } = useModal();

  return (
    <div>
      <h2>[{keyword.name}] 퀴즈 수정/삭제</h2>
      <QuizList />
      <br />
      <Button
        onClick={openModal}
        variant="contained"
        fullWidth
        size="large"
        color="success"
      >
        퀴즈 추가하기
      </Button>
      <QuizModal open={open} onClose={closeModal} />
    </div>
  );
};

export default RoadmapQuizsPage;
