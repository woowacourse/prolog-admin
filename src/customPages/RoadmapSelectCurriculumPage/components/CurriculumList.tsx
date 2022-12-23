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
import { useNavigate } from 'react-router-dom';
import { useGetCurriculums } from '../../../hooks/roadmap';
import { translateColumns } from '../../../utils/translate';

const CurriculumList = () => {
  const navigate = useNavigate();

  const { curriculums } = useGetCurriculums();

  const selectCurriculum = (curriculumId: number) => {
    navigate(`/roadmap/${curriculumId}`);
  };

  const columns = [...translateColumns(curriculums?.[0] ?? {})];

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
          {curriculums?.map((row) => (
            <TableRow
              key={row.curriculumId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {Object.values(row).map((value, index) => (
                <TableCell key={index} component="th" scope="row">
                  {value}
                </TableCell>
              ))}
              <TableCell
                onClick={() => selectCurriculum(row.curriculumId)}
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

export default CurriculumList;
