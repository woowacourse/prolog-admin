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
import { useNavigate, useParams } from 'react-router-dom';
import { useGetTopKeywordList } from '../../../../hooks/roadmap';
import { translateColumns } from '../../../../utils/translate';

const RECOMMENDED_POST_INDEX = 8;

const TopKeywordList = () => {
  const navigate = useNavigate();
  const { sessionId } = useParams();

  const { topKeywordList } = useGetTopKeywordList(Number(sessionId));

  const selectKeyword = (keywordId: number) => {
    navigate(`/roadmap/${sessionId}/${keywordId}`);
  };

  const columns = [...translateColumns(topKeywordList?.[0] ?? {})];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column}>{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {topKeywordList?.map((row) => (
            <TableRow
              key={row.keywordId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {Object.values(row).map((value, index) => (
                <TableCell key={index} component="th" scope="row">
                  <>{index === RECOMMENDED_POST_INDEX ? '' : value}</>
                </TableCell>
              ))}
              <TableCell
                onClick={() => selectKeyword(row.keywordId)}
                align="right"
              >
                <Button variant="contained">선택</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TopKeywordList;
