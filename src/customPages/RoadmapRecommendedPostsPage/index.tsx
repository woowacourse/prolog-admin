import { Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { KeywordResponse } from '../../hooks/roadmap';
import useModal from '../../hooks/useModal';
import RecommendedPostList from './RecommendedPostList';
import RecommendedPostModal from './RecommendedPostModal';

const RoadmapRecommendedPostsPage = () => {
  const keyword = useLocation().state as KeywordResponse;

  const { open, openModal, closeModal } = useModal();

  return (
    <div>
      <h2>[{keyword?.name}] 추천 포스트 수정/삭제</h2>
      <RecommendedPostList />
      <br />
      <Button
        onClick={openModal}
        variant="contained"
        fullWidth
        size="large"
        color="success"
      >
        추천 포스트 추가하기
      </Button>
      {/* 상태 초기화를 위하여 open 조건문 추가 */}
      {open && <RecommendedPostModal open={open} onClose={closeModal} />}
    </div>
  );
};

export default RoadmapRecommendedPostsPage;
