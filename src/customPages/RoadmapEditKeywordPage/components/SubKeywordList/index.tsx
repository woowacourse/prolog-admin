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
} from '@mui/material';
import { useDeleteKeyword } from '../../../../hooks/roadmap';
import { EditKeywordModal } from '../EditKeywordModal';
import { CustomTableCell } from '../CustomTableCell';
import { ChildrenKeyword } from '../../../../types';
import { SubKeywordListProps } from './type';

const SubKeywordList = ({
  childrenKeywordList,
  sessionId,
}: SubKeywordListProps) => {
  const columns = ['버튼', ...Object.keys(childrenKeywordList[0])];
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

  const [keywordContents, setKeywordContents] = useState<ChildrenKeyword>({
    keywordId: 0,
    name: '',
    order: 0,
    importance: 0,
    description: '',
    parentKeywordId: null,
  });

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
                  <Button
                    onClick={() => {
                      setKeywordContents(item);
                      handleOpen();
                    }}
                  >
                    수정
                  </Button>
                  <Button
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
                </TableCell>
                <CustomTableCell item={item} sessionId={sessionId} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <EditKeywordModal
        open={open}
        onClose={handleClose}
        keywordContents={keywordContents}
        sessionId={sessionId}
        keywordId={keywordContents.keywordId}
      />
    </>
  );
};

export default SubKeywordList;
