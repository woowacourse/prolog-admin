import { Button } from '@mui/material';
import useModal from '../../hooks/useModal';
import { KeywordModal } from '../RoadmapEditKeywordPage/components/KeywordModal';
import TopKeywordList from './components/TopKeywordList';

const RoadMapSelectTopKeywordPage = () => {
  const { open, openModal, closeModal } = useModal();

  return (
    <div>
      <h2>수정할 최상위 키워드 선택</h2>
      <TopKeywordList />
      <br />
      <Button
        onClick={openModal}
        variant="contained"
        fullWidth
        size="large"
        color="success"
      >
        최상위 키워드 추가
      </Button>
      {/* 상태 초기화를 위하여 open 조건문 추가 */}
      {open && (
        <KeywordModal open={open} onClose={closeModal} parentKeywordId={null} />
      )}
    </div>
  );
};

export default RoadMapSelectTopKeywordPage;
