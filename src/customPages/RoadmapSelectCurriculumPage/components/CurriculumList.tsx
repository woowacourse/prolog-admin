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
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Curriculum,
  useDeleteCurriculumMutation,
  useGetCurriculums,
} from '../../../hooks/roadmap';
import useModal from '../../../hooks/useModal';
import { translateColumns } from '../../../utils/translate';
import CurriculumModal from './CurriculumModal';

const CurriculumList = () => {
  const navigate = useNavigate();

  const { curriculums } = useGetCurriculums();
  const { mutateAsync: deleteCurriculum } = useDeleteCurriculumMutation();

  const [editingCurriculum, setEditingCurriculum] = useState<Curriculum>();

  const { open, openModal, closeModal } = useModal();

  const selectCurriculum = (curriculumId: number) => {
    navigate(`/roadmap/${curriculumId}`);
  };

  const columns = [...translateColumns(curriculums?.[0] ?? {})];

  return (
    <>
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
                  onClick={() => {
                    openModal();
                    setEditingCurriculum(row);
                  }}
                  align="right"
                  sx={{ width: 0 }}
                >
                  <Button variant="outlined" color="success">
                    수정
                  </Button>
                </TableCell>
                <TableCell
                  onClick={() => deleteCurriculum(row.curriculumId)}
                  align="right"
                  sx={{ width: 0 }}
                >
                  <Button variant="outlined" color="error">
                    삭제
                  </Button>
                </TableCell>
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
      <CurriculumModal
        open={open}
        onClose={closeModal}
        prevCurriculum={editingCurriculum}
      />
    </>
  );
};

export default CurriculumList;
