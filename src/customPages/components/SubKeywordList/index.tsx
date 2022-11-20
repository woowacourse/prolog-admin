import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import { useNavigate } from 'react-router-dom';
import { useDeleteKeyword } from '../../../hooks/roadmap';

type ListProps = {
  childrenKeywordList: { keywordId: number; name: string }[];
  sessionId: number;
};

const SubKeywordList = ({ childrenKeywordList, sessionId }: ListProps) => {
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

  return (
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
                <Button>수정</Button>
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
  );
};

export default SubKeywordList;

export const CustomTableCell = ({
  item,
  sessionId,
}: {
  item: { keywordId: number; name: string };
  sessionId: number;
}) => {
  const navigate = useNavigate();
  return (
    <>
      {Object.values(item).map((itemValue, index) => {
        if (Array.isArray(itemValue)) {
          return (
            <TableCell key={index} component="th" scope="row">
              <Button
                key={itemValue}
                onClick={() =>
                  navigate(`/roadmap/${sessionId}/editSubKeywords`, {
                    state: {
                      childrenKeywordList: itemValue,
                      sessionId,
                      name: item.name,
                    },
                  })
                }
              >
                하위 키워드({itemValue.length}개) 목록 보기
              </Button>
            </TableCell>
          );
        }

        return (
          <TableCell key={index} component="th" scope="row">
            {itemValue}
          </TableCell>
        );
      })}
    </>
  );
};
