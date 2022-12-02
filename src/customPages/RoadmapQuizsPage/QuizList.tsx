import { useParams } from 'react-router-dom';
import {
  Quiz,
  useDeleteQuiz,
  useGetQuizListByKeyword,
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
import QuizModal from './QuizModal';
import { translateColumns } from '../../utils/translate';

const QuizList = () => {
  const params = useParams();
  const sessionId = Number(params.sessionId);
  const keywordId = Number(params.keywordId);

  const { quizList } = useGetQuizListByKeyword({
    sessionId,
    keywordId,
  });
  const { mutateAsync: deleteQuiz } = useDeleteQuiz({
    sessionId,
    keywordId,
  });

  const [editingQuiz, setEditingQuiz] = useState<Quiz>();
  const { open, openModal, closeModal } = useModal();

  const handleClickEditButton = (quiz: Quiz) => {
    openModal();
    setEditingQuiz(quiz);
  };

  const handleClickDeleteButton = (quiz: Quiz) => {
    if (window.confirm(`${quiz.quizId}번 퀴즈를 삭제하시겠습니까?`)) {
      deleteQuiz(quiz.quizId);
    }
  };

  const columns = ['편집버튼', ...translateColumns(quizList?.[0] ?? {})];

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
            {quizList?.map((item) => (
              <TableRow
                key={item.quizId}
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
      <QuizModal open={open} onClose={closeModal} prevQuiz={editingQuiz} />
    </>
  );
};

export default QuizList;
