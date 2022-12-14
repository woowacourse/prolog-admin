import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
    navigate(`/roadmap/curriculum/${curriculumId}`);
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
                key={row.id}
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
                    ??????
                  </Button>
                </TableCell>
                <TableCell
                  onClick={() => {
                    if (
                      window.confirm(
                        '??????????????? ???????????? ?????? ?????? ????????? ???????????????. ?????? ?????????????????????????'
                      )
                    ) {
                      deleteCurriculum(row.id);
                    }
                  }}
                  align="right"
                  sx={{ width: 0 }}
                >
                  <Button variant="outlined" color="error">
                    ??????
                  </Button>
                </TableCell>
                <TableCell
                  onClick={() => selectCurriculum(row.id)}
                  align="right"
                >
                  <Button variant="contained">??????</Button>
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
