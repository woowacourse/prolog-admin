import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@mui/material';
import { AddKeywordModal } from './components/AddKeywordModal';
import SubKeywordList from './components/SubKeywordList';

const RoadmapEditKeywordPage = () => {
  const { state } = useLocation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <h2>[{state.name}] 하위 키워드 수정/삭제</h2>
      <SubKeywordList
        childrenKeywordList={state.childrenKeywordList}
        sessionId={state.sessionId}
      />
      <br />
      <Button
        onClick={handleOpen}
        variant="contained"
        fullWidth
        size="large"
        color="success"
      >
        [{state.name}] 하위에 새 키워드 추가
      </Button>
      <AddKeywordModal
        open={open}
        onClose={handleClose}
        sessionId={state.sessionId}
        parentKeywordId={state.parentKeywordId}
      />
    </div>
  );
};

export default RoadmapEditKeywordPage;
