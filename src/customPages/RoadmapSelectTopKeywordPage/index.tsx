import { useGetTopKeywordList } from '../../hooks/roadmap';
import { useNavigate, useParams } from 'react-router-dom';
import TopKeywordList from './components/TopKeywordList';
import { Button } from '@mui/material';
import useModal from '../../hooks/useModal';
import { KeywordModal } from '../RoadmapEditKeywordPage/components/KeywordModal';

const RoadMapSelectTopKeywordPage = () => {
  const navigate = useNavigate();
  const { sessionId } = useParams();

  const { topKeywordList } = useGetTopKeywordList(Number(sessionId));

  const { open, openModal, closeModal } = useModal();

  return (
    <div>
      <h2>수정할 최상위 키워드 선택</h2>
      {topKeywordList && (
        <TopKeywordList
          rows={topKeywordList}
          onClickMove={(keywordId: number) => {
            navigate(`/roadmap/${sessionId}/${keywordId}`);
          }}
        />
      )}
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
      <KeywordModal open={open} onClose={closeModal} parentKeywordId={null} />
    </div>
  );
};

export default RoadMapSelectTopKeywordPage;
