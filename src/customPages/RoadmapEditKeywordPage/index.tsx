import { Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetTopKeywordList, useSelectedKeyword } from '../../hooks/roadmap';
import useModal from '../../hooks/useModal';
import { useQueryParams } from '../../hooks/useQueryParams';
import { KeywordModal } from './components/KeywordModal';
import SubKeywordList from './components/SubKeywordList';

const RoadmapEditKeywordPage = () => {
  const { sessionId, keywordId } = useParams();
  const queryParams = useQueryParams();

  const depth = queryParams.second ? 2 : 1;
  const depthToKeyword = {
    '1': keywordId,
    '2': queryParams.second,
  };

  const { selectedKeyword } = useSelectedKeyword({
    sessionId: Number(sessionId),
    keywordId: Number(keywordId),
    selectedKeywordId: Number(depthToKeyword[depth]),
  });

  const { topKeywordList } = useGetTopKeywordList(Number(sessionId));
  const { open, openModal, closeModal } = useModal();

  return (
    <div>
      <h2>[{selectedKeyword?.name}] 하위 키워드 수정/삭제</h2>
      {selectedKeyword && (
        <SubKeywordList
          childrenKeywordList={selectedKeyword?.childrenKeywords ?? []}
          depth={depth}
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
      {/* 상태 초기화를 위하여 open 조건문 추가 */}
      {open && (
        <KeywordModal
          open={open}
          onClose={closeModal}
          keywordCount={topKeywordList?.length ?? 0}
          parentKeywordId={selectedKeyword?.keywordId}
        />
      )}
    </div>
  );
};

export default RoadmapEditKeywordPage;
