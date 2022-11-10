import Button from '@mui/material/Button';

const PopularStudylogsUpdate = () => {
  const updatePopularStudylogs = () => {
    if (window.confirm('인기있는 학습로그를 업데이트 하시겠습니까?')) {
      fetch(`${process.env.REACT_APP_API_URL}/studylogs/popular/sync`).catch(
        (err) => console.log(err)
      );
    }
  };

  return (
    <Button variant="contained" onClick={updatePopularStudylogs}>
      인기있는 학습로그 업데이트
    </Button>
  );
};

export default PopularStudylogsUpdate;
