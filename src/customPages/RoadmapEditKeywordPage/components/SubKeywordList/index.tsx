import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { KeywordResponse, useDeleteKeyword } from '../../../../hooks/roadmap';
import useModal from '../../../../hooks/useModal';
import { translateColumns } from '../../../../utils/translate';
import { CustomTableCell } from '../CustomTableCell';
import { KeywordModal } from '../KeywordModal';

export type SubKeywordListProps = {
  childrenKeywordList: KeywordResponse[];
  depth: number;
};

const SubKeywordList = ({
  childrenKeywordList,
  depth,
}: SubKeywordListProps) => {
  const sessionId = Number(useParams().sessionId);
  const navigate = useNavigate();

  const [editingKeyword, setEditingKeyword] = useState<KeywordResponse>();

  const { open, openModal, closeModal } = useModal();

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

  const handleClickQuizButton = (item: KeywordResponse) => {
    navigate(`/roadmap/${sessionId}/${item.keywordId}/quizs`, { state: item });
  };

  if (childrenKeywordList.length === 0) {
    return <></>;
  }

  const columns = [
    '편집버튼',
    ...translateColumns(childrenKeywordList[0]),
    '퀴즈',
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
                        openModal();
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
                <CustomTableCell item={item} depth={depth} />
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
        onClose={closeModal}
        prevKeyword={editingKeyword}
      />
    </>
  );
};

export default SubKeywordList;
