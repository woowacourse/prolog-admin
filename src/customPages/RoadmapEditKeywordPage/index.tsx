import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import SubKeywordList from './components/SubKeywordList';
import { KeywordModal } from './components/KeywordModal';
import { useGetTopKeywordList, useSelectedKeyword } from '../../hooks/roadmap';
import useModal from '../../hooks/useModal';

const RoadmapEditKeywordPage = () => {
  const { sessionId, keywordId } = useParams();

  const { selectedKeyword } = useSelectedKeyword({
    sessionId: Number(sessionId),
    keywordId: Number(keywordId),
  });

  const { topKeywordList } = useGetTopKeywordList(Number(sessionId));
  const { open, openModal, closeModal } = useModal();

  return (
    <div>
      <h2>[{selectedKeyword?.name}] 하위 키워드 수정/삭제</h2>
      {selectedKeyword && (
        <SubKeywordList
          childrenKeywordList={selectedKeyword?.childrenKeywords ?? []}
        />
      )}
      <br />
      <Button
        onClick={openModal}
        variant="contained"
        fullWidth
        size="large"
        color="success"
        style={{ textTransform: 'unset' }} // prevent uppercase
      >
        [{selectedKeyword?.name}] 하위에 새 키워드 추가
      </Button>
      <KeywordModal
        open={open}
        onClose={closeModal}
        keywordCount={topKeywordList?.length ?? 0}
        parentKeywordId={selectedKeyword?.keywordId}
      />
    </div>
  );
};

export default RoadmapEditKeywordPage;
