import { useGetChildrenKeywordList } from '../../hooks/roadmap';
import { useParams } from 'react-router-dom';
import SubKeywordList from '../RoadmapEditKeywordPage/components/SubKeywordList';
import { Button } from '@mui/material';
import { useState } from 'react';
import { KeywordModal } from '../RoadmapEditKeywordPage/components/KeywordModal';

const RoadmapTopKeywordsPage = () => {
  const { sessionId, keywordId } = useParams();
  const { childrenKeywordList } = useGetChildrenKeywordList({
    sessionId: Number(sessionId),
    keywordId: Number(keywordId),
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  if (typeof childrenKeywordList === 'undefined') {
    return <h3>선택하신 최상위 키워드에 콘텐츠가 존재하지 않습니다.</h3>;
  }

  return (
    <div>
      <h2>최상위 키워드 수정/삭제</h2>
      <SubKeywordList
        childrenKeywordList={childrenKeywordList}
        sessionId={Number(sessionId)}
      />
      <br />
      <Button
        onClick={handleOpen}
        variant="contained"
        fullWidth
        size="large"
        color="success"
      >
        해당 최상위 키워드 하위에 새 키워드 추가
      </Button>
      <KeywordModal open={open} onClose={handleClose} parentKeywordId={null} />
    </div>
  );
};

export default RoadmapTopKeywordsPage;
