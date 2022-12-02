import { useLocation } from 'react-router-dom';
import { Button } from '@mui/material';
import SubKeywordList from './components/SubKeywordList';
import { KeywordModal } from './components/KeywordModal';
import { KeywordResponse } from '../../hooks/roadmap';
import useModal from '../../hooks/useModal';

const RoadmapEditKeywordPage = () => {
  const parentKeyword = useLocation().state as KeywordResponse;
  const { name, childrenKeywords, keywordId: parentKeywordId } = parentKeyword;

  const { open, openModal, closeModal } = useModal();

  return (
    <div>
      <h2>[{name}] 하위 키워드 수정/삭제</h2>
      {childrenKeywords && (
        <SubKeywordList childrenKeywordList={childrenKeywords} />
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
        [{name}] 하위에 새 키워드 추가
      </Button>
      <KeywordModal
        open={open}
        onClose={closeModal}
        parentKeywordId={parentKeywordId}
      />
    </div>
  );
};

export default RoadmapEditKeywordPage;
