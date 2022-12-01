import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import SubKeywordList from './components/SubKeywordList';
import { KeywordModal } from './components/KeywordModal';
import { KeywordResponse } from '../../hooks/roadmap';

const RoadmapEditKeywordPage = () => {
  const sessionId = Number(useParams().sessionid);
  const parentKeyword = useLocation().state as KeywordResponse;
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { name, childrenKeywords } = parentKeyword;

  return (
    <div>
      <h2>[{name}] 하위 키워드 수정/삭제</h2>
      {childrenKeywords && (
        <SubKeywordList
          childrenKeywordList={childrenKeywords}
          sessionId={sessionId}
        />
      )}
      <br />
      <Button
        onClick={handleOpen}
        variant="contained"
        fullWidth
        size="large"
        color="success"
      >
        [{parentKeyword.name}] 하위에 새 키워드 추가
      </Button>
      <KeywordModal
        open={open}
        onClose={handleClose}
        parentKeywordId={parentKeyword.keywordId}
      />
    </div>
  );
};

export default RoadmapEditKeywordPage;
