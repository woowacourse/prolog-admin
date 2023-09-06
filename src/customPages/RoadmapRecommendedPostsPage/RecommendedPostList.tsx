import { useParams } from 'react-router-dom';
import {
  RecommendedPost,
  useDeleteRecommendedPost,
  useGetRecommendedPostListByKeyword,
} from '../../hooks/roadmap';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Stack,
} from '@mui/material';
import useModal from '../../hooks/useModal';
import { useState } from 'react';
import RecommendedPostModal from './RecommendedPostModal';
import { translateColumns } from '../../utils/translate';

const RecommendedPostList = () => {
  const params = useParams();
  const sessionId = Number(params.sessionId);
  const keywordId = Number(params.keywordId);

  const { recommendedPostList } = useGetRecommendedPostListByKeyword({
    sessionId,
    keywordId,
  });
  const { mutateAsync: deleteRecommendedPost } = useDeleteRecommendedPost({
    keywordId,
  });

  const [editingRecommendedPost, setEditingRecommendedPost] =
    useState<RecommendedPost>();
  const { open, openModal, closeModal } = useModal();

  const handleClickEditButton = (recommendedPost: RecommendedPost) => {
    openModal();
    setEditingRecommendedPost(recommendedPost);
  };

  const handleClickDeleteButton = (recommendedPost: RecommendedPost) => {
    if (
      window.confirm(`${recommendedPost.id}번 추천 포스트를 삭제하시겠습니까?`)
    ) {
      deleteRecommendedPost(recommendedPost.id);
    }
  };

  const columns = [
    '편집버튼',
    ...translateColumns(recommendedPostList?.[0] ?? {}),
  ];
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: '#bfd4ee' }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column}>{column}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {recommendedPostList?.map((item) => (
              <TableRow
                key={item.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left">
                  <Stack spacing={1}>
                    <Button
                      variant="outlined"
                      color="success"
                      onClick={() => handleClickEditButton(item)}
                    >
                      수정
                    </Button>

                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleClickDeleteButton(item)}
                    >
                      삭제
                    </Button>
                  </Stack>
                </TableCell>
                {Object.values(item).map((value, index) => (
                  <TableCell key={index} component="th" scope="row">
                    {value}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <RecommendedPostModal
        open={open}
        onClose={closeModal}
        prevRecommendedPost={editingRecommendedPost}
      />
    </>
  );
};

export default RecommendedPostList;
