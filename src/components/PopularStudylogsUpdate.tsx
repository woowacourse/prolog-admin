import Button from '@mui/material/Button';
import { useGetPopularStudylogs } from '../hooks/studylog';

const PopularStudylogsUpdate = () => {
  const { refetch } = useGetPopularStudylogs();

  const onClickUpdateButton = () => {
    if (window.confirm('인기있는 학습로그를 업데이트 하시겠습니까?')) {
      refetch();
    }
  };

  return (
    <Button variant="contained" onClick={onClickUpdateButton}>
      인기있는 학습로그 업데이트
    </Button>
  );
};

export default PopularStudylogsUpdate;
