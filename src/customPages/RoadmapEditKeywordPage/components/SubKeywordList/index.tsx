import { useState } from 'react';
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
import { KeywordResponse, useDeleteKeyword } from '../../../../hooks/roadmap';
import { KeywordModal } from '../KeywordModal';
import { CustomTableCell } from '../CustomTableCell';
import { SubKeywordListProps } from './type';
import { useNavigate, useParams } from 'react-router-dom';

const SubKeywordList = ({ childrenKeywordList }: SubKeywordListProps) => {
  const sessionId = Number(useParams().sessionId);
  const navigate = useNavigate();
  const [editingKeyword, setEditingKeyword] = useState<KeywordResponse>();
  const columns = [
    '편집버튼',
    'Id',
    '이름',
    '설명',
    '순서',
    '중요도',
    '상위키워드Id',
    '하위키워드',
    '퀴즈',
  ];

  const { mutate: deleteKeyword } = useDeleteKeyword();
  const handleDeleteButton = ({
    sessionId,
    keywordId,
    name,
  }: {
    sessionId: number;
    keywordId: number;
    name: string;
  }) => {
    if (window.confirm(`키워드 ${name}를 삭제하시겠습니까?`)) {
      deleteKeyword({ sessionId, keywordId });
    }
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // const [keywordContents, setKeywordContents] = useState<ChildrenKeyword>({
  //   keywordId: 0,
  //   name: '',
  //   order: 0,
  //   importance: 0,
  //   description: '',
  //   parentKeywordId: null,
  // });

  const handleClickQuizButton = (item: KeywordResponse) => {
    navigate(`/roadmap/${sessionId}/${item.keywordId}/quizs`, { state: item });
  };

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
            {childrenKeywordList.map((item) => (
              <TableRow
                key={item.keywordId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left">
                  <Stack spacing={1}>
                    <Button
                      variant="outlined"
                      color="success"
                      onClick={() => {
                        setEditingKeyword(item);
                        handleOpen();
                      }}
                    >
                      수정
                    </Button>

                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() =>
                        handleDeleteButton({
                          sessionId,
                          keywordId: item.keywordId,
                          name: item.name,
                        })
                      }
                    >
                      삭제
                    </Button>
                  </Stack>
                </TableCell>
                <CustomTableCell item={item} sessionId={sessionId} />
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => handleClickQuizButton(item)}
                  >
                    퀴즈 보기
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <KeywordModal
        open={open}
        onClose={handleClose}
        prevKeyword={editingKeyword}
      />
    </>
  );
};

export default SubKeywordList;
