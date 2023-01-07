import { Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { KeywordResponse } from '../../hooks/roadmap';
import useModal from '../../hooks/useModal';
import QuizList from './QuizList';
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
      {/* 상태 초기화를 위하여 open 조건문 추가 */}
      {open && <QuizModal open={open} onClose={closeModal} />}
    </div>
  );
};

export default RoadmapQuizsPage;
